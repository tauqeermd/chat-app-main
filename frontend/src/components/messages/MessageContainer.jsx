import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti";
import { BiArrowBack } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation, setShowMessageContainer } = useConversation();
	const { onlineUsers } = useSocketContext();
	
	const isUserOnline = (userId) => {
		return onlineUsers.includes(userId);
	};
	
	const handleBackClick = () => {
		setShowMessageContainer(false);
	};
	
	useEffect(() =>{
		// cleanup function // unmounts
		return () => setSelectedConversation(null);
	}, [setSelectedConversation])

	// const {selectedConversation, setSelectedConversation} = useConversation();
    return (

		<div className='w-full md:flex-1 flex flex-col h-full'>
			{!selectedConversation ? (<NoChatSelected/>) : (
                <div className="flex flex-col h-screen">
				{/* Header */}
				<div className='bg-slate-500 px-3 sm:px-6 py-3 flex items-center shadow-md sticky top-0 z-10 mb-2'>
					<button 
						onClick={handleBackClick} 
						className="md:hidden mr-2 text-gray-900 hover:text-gray-700 transition-colors"
					>
						<BiArrowBack className="w-6 h-6" />
					</button>
					<div className={`avatar ${isUserOnline(selectedConversation._id) ? "online" : ""} mr-2 sm:mr-3`}>
						<div className='w-8 sm:w-10 rounded-full'>
							<img src={selectedConversation.profilePic} alt="User avatar" />
						</div>
					</div>
					<div>
						<span className='text-gray-900 font-bold text-sm sm:text-base'>{selectedConversation.fullName}</span>
						<p className='text-xs text-gray-700'>{isUserOnline(selectedConversation._id) ? 'Online' : 'Offline'}</p>
					</div>
				</div>

				{/* Add more space between header and messages */}
				<div className="h-3 bg-transparent"></div>

				<div className="flex-grow overflow-auto">
					<Messages />
				</div>
				
				<div className="sticky bottom-0 w-full">
					<MessageInput />
				</div>
				</div>
            )}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-2 sm:px-4 text-center text-base sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-1 sm:gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-2xl sm:text-3xl md:text-6xl lg:text-7xl text-center mt-4' />
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;