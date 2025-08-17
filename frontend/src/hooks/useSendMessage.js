// import React, { useState } from 'react'
// import useConversation from '../zustand/useConversation';
// import toast from 'react-hot-toast';

// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const {messages, setMessages, selectedConversation} = useConversation();

//   const sendMessage = async (message) => { 
//     setLoading(true);
//     try {
//         const res = await fetch(`/api/messages/send/${selectedConversation._id}`, { // api mein messages nhi message hai 
//             method: "POST",                                                        // shi se api likho
//             headers:{
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({message}),
//         })
//         const data = res.json();
//         if(data.error){
//             throw new Error(data.error);
//         }

//         setMessages([...messages, data]);
//     } catch (error) {
//         toast.error(error.mesage);
//     } finally{
//         setLoading(false);
//     }
//   }

//   return {sendMessage, loading};
// }

// export default useSendMessage


import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			console.log("Response Data:", data);
			if (data.error) throw new Error(data.error);
			setMessages([...messages, data]);
			// setMessages((messages) => {
			// 	// Here, prevMessages is automatically the current state of messages
			// 	if (Array.isArray(messages)) {
			// 		return [...messages, data]; // Append new message
			// 	} else {
			// 		return [data]; // If not an array, return new message in an array
			// 	}
			// });
			// setMessages((messages) => {
			// 	// Ensure prevMessages is always an array
			// 	const updatedMessages = messages ? [...messages, data] : [data];
			// 	return updatedMessages;
			// });
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;