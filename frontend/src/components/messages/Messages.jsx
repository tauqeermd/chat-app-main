// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";

// const Messages = () => {

// 	const {messages, loading} = useGetMessages();
// 	console.log("messages: ", messages);
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{!loading &&
// 				messages.length > 0 &&
// 				messages.map((message) => (
// 					<div key={message._id} >
// 						<Message message={message} />
// 					</div>
// 				))}

// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
// 			{!loading && messages.length === 0 && (
// 				<p className='text-center'>Send a message to start the conversation</p>
// 			)}
// 		</div>
// 	);
// };
// export default Messages;


import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	console.log("messages: ", messages);
	
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		if (messages.length > 0) {
			setTimeout(() => {
				lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
			}, 100);
		}
	}, [messages]);

	return (
		<div className='px-2 sm:px-4 pb-2 w-full'>
			{/* Add substantial padding at the top for first message */}
			{messages.length > 0 && <div className="pt-5 mb-2"></div>}
			
			{!loading &&
				messages.length > 0 &&
				messages.map((message, idx) => (
					<div key={message._id}
					className={`${idx === 0 ? "mt-4" : ""}`}
					ref={idx === messages.length - 1 ? lastMessageRef : null}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center text-sm sm:text-base'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;


// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;