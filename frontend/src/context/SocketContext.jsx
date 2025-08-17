import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";


const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
			const socket = io(backendUrl, {
        query: {
          userId: authUser._id,
        },
      });

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from 'socket.io-client';

// export const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };

// export const SocketContextProvider = ({children}) =>{
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const {authUser} = useAuthContext();

//     useEffect(()=>{
//         if(authUser){
//             const socket = io("http://localhost:5000", {
//                 query: {
//                     userId: authUser.id,
//                 }
//             });

//             setSocket(socket);
//             // socket.on() used both on client and server sides to listen to events;
//             socket.on("getOnlineUsers", (users) =>{
//                 setOnlineUsers(users);
//             })

//             return ()=>socket.close();
//         }else{
//             if(socket){
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     }, [authUser]);
//     return <SocketContext.Provider value ={{socket, onlineUsers}}>{children}</SocketContext.Provider>
// };
