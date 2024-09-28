import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css';

const ChatCopy = () => {
  const [userData, setUserData] = useState({});
  const currentUser = useSelector(selectCurrentUser);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);  // Use ref for socket

  useEffect(() => {
    // Initialize the socket connection when the component mounts
    socketRef.current = io('http://localhost:3000');

    return () => {
      // Clean up socket when component unmounts
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch(`https://taskify-server-sable.vercel.app/api/v1/auth/${currentUser?.email}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching user data:', err));

    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));

    if (currentUser?.email) {
      socketRef.current.emit('joinRoom', currentUser.email);

      socketRef.current.on('chatMessage', (message) => {
        if (
          (message.sender === currentUser?.email && message.receiver === selectedUser?.email) ||
          (message.sender === selectedUser?.email && message.receiver === currentUser?.email)
        ) {
          setMessages((prevMessages) => {
            if (!prevMessages.find((msg) => msg.timestamp === message.timestamp)) {
              return [...prevMessages, message];
            }
            return prevMessages;
          });
        }
      });
    }

    return () => {
      socketRef.current.off('chatMessage');
    };
  }, [selectedUser, currentUser?.email]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const selectUser = (user) => {
    setSelectedUser({ email: user.email, name: user.name.firstName, image: user.image });
    fetchChatHistory(user.email);
  };

  const fetchChatHistory = async (receiverEmail) => {
    try {
      const response = await fetch(`http://localhost:3000/chat/${currentUser.email}/${receiverEmail}`);
      const chatHistory = await response.json();
      setMessages(chatHistory);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;

    const messageData = {
      sender: currentUser.email,  // Sender's email
      receiver: selectedUser.email,  // Fix: Use selectedUser's email, not the whole object
      message: input,
      timestamp: new Date().toISOString(),
    };

    // Emit the message to the server
    socketRef.current.emit('chatMessage', messageData);
    setInput('');
  };

  return (
    <div className='flex h-[100vh] w-[100vw] overflow-hidden'>
      <div className='grid grid-cols-8 w-full'>

        {/* Sidebar */}
        <div className='col-span-2 bg-black text-white p-5 flex flex-col overflow-hidden'>
          <ul className='overflow-y-auto flex-grow'>
            {users
              .filter(user => user?.email !== currentUser?.email)
              .map((user) => (
                <li key={user._id} onClick={() => selectUser(user)} className='flex items-center cursor-pointer mb-4'>
                  <img className='w-10 h-10 rounded-full mr-3' src={user?.image} alt="" />
                  <div>
                    <h2>{user?.name.firstName}</h2>
                    <span className='text-sm'>{user?.email}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Chat Box */}
        <div className='col-span-4 flex flex-col bg-gray-100'>
          {selectedUser && (
            <div className='flex flex-col h-full overflow-hidden'>

              <div className='p-3 bg-gray-200'>
                <div className='flex items-center'>
                  <img src={selectedUser.image} className='w-10 h-10 rounded-full mr-2' alt="" />
                  <div>
                    <h2>{selectedUser.name}</h2>
                    <p className='text-sm'>{selectedUser.email}</p>
                  </div>
                </div>
              </div>

              <ul
                ref={chatContainerRef}
                className='flex-grow overflow-y-auto p-5 bg-white max-h-[85vh]'
              >
                {messages.map((msg, index) => (
                  <li key={index} className={`mb-4 ${msg.sender === currentUser.email ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === currentUser.email ? 'bg-blue-500 text-white max-w-[70%]' : 'bg-gray-300 text-black max-w-[70%]'}`}>
                      {msg.message}
                    </span>
                  </li>
                ))}
              </ul>

              <form onSubmit={sendMessage} className='p-4 bg-gray-200 flex mt-auto'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className='flex-grow px-4 py-2 rounded-lg border border-gray-300'
                />
                <button className='ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg' type="submit">Send</button>
              </form>

            </div>
          )}
        </div>

        {/* User Profile */}
        <div className='col-span-2 flex flex-col items-center justify-center bg-gray-50'>
          <img src={userData?.data?.image} className='w-32 h-32 rounded-full' alt="" />
          <h2 className='mt-4'>{`${userData?.data?.name?.firstName} ${userData?.data?.name?.lastName}`}</h2>
          <span className='text-sm'>{userData?.data?.email}</span>
        </div>

      </div>
    </div>
  );
};

export default ChatCopy;
