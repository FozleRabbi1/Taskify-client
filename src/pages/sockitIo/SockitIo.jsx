import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css'; // Import your CSS file for styling

const socket = io('http://localhost:3000');

const Chat = () => {
  const [userData, setUserData] = useState({});
  const currentUser = useSelector(selectCurrentUser);
  
  // State for messages, input, users, selected user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch current user data
    fetch(`https://taskify-server-sable.vercel.app/api/v1/auth/${currentUser?.email}`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching user data:', err));

    // Fetch all users from the backend
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));

    // Listen for new messages
    socket.on('chatMessage', (message) => {
      // Check if the message is relevant to this chat
      if (
        (message.sender === currentUser?.email && message.receiver === selectedUser) ||
        (message.sender === selectedUser && message.receiver === currentUser?.email)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('chatMessage');
    };
  }, [selectedUser, currentUser?.email]);

  const selectUser = (user) => {
    setSelectedUser(user.email);
    fetchChatHistory(user.email); // Fetch chat history for the selected user
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
    socket.emit('chatMessage', messageData); // Send message to the server
    setInput(''); // Clear input after sending
  };

  return (
    <div>
      <h1>Chat App</h1>
      <h2>{`${userData?.data?.name?.firstName} ${userData?.data?.name?.lastName}`}</h2>
      <span>{userData?.data?.email}</span>

      {/* Display list of users */}
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
