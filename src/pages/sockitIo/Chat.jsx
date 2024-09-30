import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css';
import FakeView from './FakeView';
import { UsersApi } from '../../redux/fetures/Users/usersApi';

const NewWithNotification = () => {
  const [userData, setUserData] = useState({});
  const { data, isLoading } = UsersApi.useGetAllUsersQuery({}, { pollingInterval: 3000 })
  const currentUser = useSelector(selectCurrentUser);

  // console.log(data?.data);


  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});



  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch(`https://taskify-server-sable.vercel.app/api/v1/auth/${currentUser?.email}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching user data:', err));

    if (currentUser?.email) {
      socketRef.current.emit('joinRoom', currentUser.email);

      const storedUnreadMessages = JSON.parse(localStorage.getItem('unreadMessages')) || {};
      setUnreadMessages(storedUnreadMessages);

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

      socketRef.current.on('newMessageNotification', (notification) => {
        if (notification.sender !== selectedUser?.email) {
          setUnreadMessages((prev) => {
            const updatedUnread = {
              ...prev,
              [notification.sender]: (prev[notification.sender] || 0) + 1,
            };
            localStorage.setItem('unreadMessages', JSON.stringify(updatedUnread));
            return updatedUnread;
          });
        }
      });
    }

    return () => {
      socketRef.current.off('chatMessage');
      socketRef.current.off('newMessageNotification');
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

    setUnreadMessages((prev) => {
      const updatedUnread = { ...prev, [user.email]: 0 };
      localStorage.setItem('unreadMessages', JSON.stringify(updatedUnread));
      return updatedUnread;
    });
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
      receiver: selectedUser.email,
      message: input,
      timestamp: new Date().toISOString(),
      image: userData?.data.image
    };


    socketRef.current.emit('chatMessage', messageData);
    setInput('');
  };

  return (
    <div className='flex h-[100vh] w-[100vw] overflow-hidden'>
      <div className='grid grid-cols-8 w-full'>
        {/* Sidebar */}
        <div className={`col-span-2 bg-black text-white p-5 flex flex-col overflow-hidden  `}>
          <ul className='space-y-4 overflow-auto'>
            {data?.data?.allUsers
              .filter((user) => user.email !== currentUser?.email)
              .map((user) => (
                <li
                  key={user.email}
                  onClick={() => selectUser(user)}
                  className={`flex items-center cursor-pointer px-2 py-1  ${selectedUser?.email === user?.email ? "border" : " border border-transparent "}`}
                >
                  <img
                    className='w-10 h-10 rounded-full mr-3'
                    src={user.image}
                    alt={user.name.firstName}
                  />

                  <div className=''>
                    
                    <h2 className='flex items-center'>{user.name.firstName}


                      {user?.isActive &&
                        <span className='text-[12px] bg-green-800 rounded mx-2 px-[3px] py-[1px] text-white flex items-center '>Active Now</span>
                      }

                      {unreadMessages[user.email] > 0 && (
                        <span className='text-xs font-bold bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center'>
                          {unreadMessages[user.email]}
                        </span>
                      )}

                    </h2>

                    <p className='text-sm'>{user.email}</p>

                  </div>

                </li>
              ))}
          </ul>
        </div>

        {/* Chat Box */}
        <div className='col-span-4 flex flex-col bg-black border border-gray-900'>
          {selectedUser ? (
            <div className='flex flex-col h-full overflow-hidden'>
              <div className='p-3 bg-gray-900'>
                <div className='flex items-center'>
                  <img
                    src={selectedUser?.image}
                    className='w-10 h-10 rounded-full mr-2'
                    alt={selectedUser?.name}
                  />
                  <div className='text-white'>
                    <h2>{selectedUser?.name}</h2>
                    <p className='text-sm'>{selectedUser?.email}</p>
                  </div>
                </div>
              </div>

              <ul ref={chatContainerRef} className='flex-grow overflow-y-auto p-5 max-h-[84vh] bg-black'>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`mb-4 ${msg.sender === currentUser.email ? 'text-right' : 'text-left'}`}
                  >



                    <div className=''>
                      {/* <img src={msg?.image} className='size-14' alt="" /> */}
                      <span
                        className={`inline-block px-4 py-2 rounded-lg ${msg.sender === currentUser.email
                          ? 'bg-blue-500 text-white max-w-[70%]'
                          : 'bg-gray-300 text-black max-w-[70%]'
                          }`}
                      >
                        {msg.message}
                      </span>
                      <p className='text-[10px]'>
                        <span className=' text-white px-1 py-[1px] rounded-md inline-block font-bold' >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </p>

                    </div>

                  </li>
                ))}
              </ul>

              <form onSubmit={sendMessage} className='p-4 bg-gray-900 flex mt-auto'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type your message...'
                  className='flex-grow px-4 py-2 rounded-lg border border-gray-300'
                />
                <button
                  className='ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
                  type='submit'
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <FakeView />
          )}
        </div>

        {/* User Profile */}
        <div className='col-span-2 flex flex-col items-center justify-center bg-black text-white'>
          <img
            style={{
              boxShadow: "'0 0 1px cyan, 0 0 2px cyan, 0 0 4px cyan, 0 0 16px cyan'"
            }}
            src={userData?.data?.image} className='w-32 h-32 rounded-full'

            alt={userData?.data?.name?.firstName} />
          <h2 style={{
            textShadow: '0 0 1px cyan, 0 0 2px cyan, 0 0 4px cyan, 0 0 16px cyan'
          }} className='mt-4 text-3xl font-bold  '>{`${userData?.data?.name?.firstName} ${userData?.data?.name?.lastName}`}</h2>
          <span className='text-[18px]'>{userData?.data?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default NewWithNotification;
