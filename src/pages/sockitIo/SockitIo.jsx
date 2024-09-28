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

    socket.on('chatMessage', (message) => {
      if (
        (message.sender === currentUser?.email && message.receiver === selectedUser) ||
        (message.sender === selectedUser && message.receiver === currentUser?.email)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('chatMessage');
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

    const messageData = { sender: currentUser.email, receiver: selectedUser, message: input };
    socket.emit('chatMessage', messageData); 
    setInput(''); 
  };

  return (
    <div>
      <h1>Chat App</h1>
      <h2>{`${userData?.data?.name?.firstName} ${userData?.data?.name?.lastName}`}</h2>
      <span>{userData?.data?.email}</span>

      <h2>Select a User to Chat</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => selectUser(user)}>
            {user?.name.firstName} <span className='text-[12px]'>{user?.email}</span>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className='mt-4 border'>
          <h2>Chatting with {selectedUser}</h2>
          <ul className='chat-messages'>
            {messages.map((msg, index) => (
              <li key={index} className={msg.sender === currentUser.email ? 'message-sent' : 'message-received'}>
                {msg.message}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
