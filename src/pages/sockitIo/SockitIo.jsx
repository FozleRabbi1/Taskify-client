import  { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SockitIo = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  console.log(socketID);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
        console.log(socket.id);
        
      setSocketId(socket.id);
      console.log("connected", socket.id);
    },[]);

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2>Socket ID: {socketID}</h2>
      </div>

      <form onSubmit={joinRoomHandler} style={{ marginBottom: "20px" }}>
        <h3>Join Room</h3>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room Name"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Join
        </button>
      </form>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room"
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>

      <div>
        {messages.map((m, i) => (
          <p key={i} style={{ padding: "10px", background: "#f4f4f4", margin: "5px 0" }}>
            {m}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SockitIo;







// import { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";

// const SockitIo = () => {
//   const socket = useMemo(
//     () =>
//       io("http://localhost:5000", {
//         withCredentials: true,
//       }),
//     []
//   );

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [room, setRoom] = useState("");
//   const [socketID, setSocketId] = useState("");
//   const [roomName, setRoomName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("message", { message, room });
//     setMessage("");
//   };

//   const joinRoomHandler = (e) => {
//     e.preventDefault();
//     socket.emit("join-room", roomName);
//     setRoomName("");
//   };

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("connected", socket.id);
//     });

//     socket.on("receive-message", (data) => {
//       console.log(data);
//       setMessages((messages) => [...messages, data]);
//     });

//     socket.on("welcome", (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container mx-auto max-w-lg p-4">
//       <div className="mb-8">
//         <div className="h-20" />
//         <h2 className="text-xl font-semibold mb-2">Socket ID: {socketID}</h2>
//       </div>

//       <form onSubmit={joinRoomHandler} className="mb-8">
//         <h5 className="text-lg font-medium mb-2">Join Room</h5>
//         <input
//           type="text"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           placeholder="Room Name"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Join
//         </button>
//       </form>

//       <form onSubmit={handleSubmit} className="mb-8">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Message"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
//         />
//         <input
//           type="text"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           placeholder="Room"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </form>

//       <div>
//         {messages.map((m, i) => (
//           <div key={i} className="p-2 bg-gray-100 mb-2 rounded-md">
//             <p className="text-base">{m}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SockitIo;
