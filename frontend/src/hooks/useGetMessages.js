// import React, { useEffect, useState } from 'react';
// import useConversation from '../zustand/useConversation'
// import toast from 'react-hot-toast';
// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const {messages, setMessages, selectedConversation} = useConversation();

//   useEffect(() => {
//     const getMessages = async () =>{
//         setLoading(true);
//         try {
//             const res = await fetch(`/api/message/${selectedConversation._id}`);
//             const data = await res.json();
//             console.log("Received data from API: ", data); //  delete later
//             if(data.error) throw new Error(data.error);
//             setMessages(data);
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }

//         if(selectedConversation?._id) {
//           getMessages();
//         }
//     }
//   }, [selectedConversation?._id, setMessages]);

//   return {messages, loading};
// }

// export default useGetMessages;

import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				// following lines are very very important
				// don't know properly why but they are
				if (!res.ok || !Array.isArray(data)) {
					setMessages([]);
				 } else {
					setMessages(data);
				 }
				// setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;