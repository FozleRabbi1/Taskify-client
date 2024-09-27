import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [userData, setUserData] = useState({});
  const currentUser = useSelector(selectCurrentUser);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`https://taskify-server-sable.vercel.app/api/v1/auth/${currentUser?.email}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching user data:', err));

    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));

    socket.emit('joinRoom', currentUser.email);

    const handleChatMessage = (message) => {
      if (
        (message.sender === currentUser?.email && message.receiver === selectedUser) ||
        (message.sender === selectedUser && message.receiver === currentUser?.email)
      ) {
        setMessages((prevMessages) => {
          if (!prevMessages.find((msg) => msg.timestamp === message.timestamp)) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      }
    };

    socket.on('chatMessage', handleChatMessage);

    return () => {
      socket.off('chatMessage', handleChatMessage);
    };
  }, [selectedUser, currentUser?.email]);

  const selectUser = (user) => {
    setSelectedUser(user.email);
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
      sender: currentUser.email,
      receiver: selectedUser,
      message: input,
      timestamp: new Date().toISOString(),
    };

    socket.emit('chatMessage', messageData);
    setInput('');
  };

  return (
    <div className='h-[100vh]'>
      <div>
        <div className='grid grid-cols-8'>

          <div className='bg-black text-white col-span-2 pt-5'>
            <ul>
              {users
              .filter(user => user?.email !== currentUser?.email)
              .map((user) => (
                <li key={user._id} onClick={() => selectUser(user)} className='flex  items-center cursor-pointer border-b-[1px] mb-2' >
                  <img className='size-14 mb-3 rounded-full mr-2' src={user?.image} alt="" />

                  <div>
                    <h2>{user?.name.firstName}</h2>
                    <span className='text-[12px]'>{user?.email}</span>
                  </div>

                </li>
              ))}
            </ul>
          </div>

          <div className='col-span-4'>
            {selectedUser && (
              <div className='border bg-red-100'>
                <h2>Chatting with {selectedUser}</h2>
                <ul className='chat-messages h-[85vh] overflow-y-auto bg-green-500 px-10 py-5 '>
                  {messages.map((msg, index) => (

                    <div key={index} className='flex' >
                      <li className={` ${msg.sender === currentUser.email ? 'message-sent' : 'message-received'}`}>
                        {msg.message}
                      </li>
                    </div>
                  ))}
                </ul>

                <form onSubmit={sendMessage} className='bg-green-300 mx-10 my-5   flex justify-between'>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className='w-[80%] py-5'
                  />
                  <button className='bg-yellow-300 w-[20%] py-5' type="submit">Send</button>
                </form>


              </div>
            )}
          </div>


          <div className='col-span-2 flex flex-col  items-center mt-10'>

            <img src={userData?.data?.image} className='size-[120px]' alt="" />
            <h2>{`${userData?.data?.name?.firstName} ${userData?.data?.name?.lastName}`}</h2>
            <span>{userData?.data?.email}</span>


          </div>

        </div>
      </div>


    </div>
  );
};

export default Chat;
