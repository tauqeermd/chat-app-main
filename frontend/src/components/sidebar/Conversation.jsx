import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"
import Conversations from "./Conversations";

const Conversation = ({conversation, lastIdx, emoji}) => {
	
	const {selectedConversation, setSelectedConversation, setShowMessageContainer} = useConversation();
	if(!conversation) {console.log("mkc conversation prop teri");}
	const isSelected = selectedConversation?._id === conversation?._id;
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const handleConversationClick = () => {
		setSelectedConversation(conversation);
		// On mobile, show the message container when a conversation is selected
		const isMobile = window.innerWidth < 768; // 768px is md breakpoint in Tailwind
		if (isMobile) {
			setShowMessageContainer(true);
		}
	};

	// console.log(onlineUsers);
	return (
		<>
			<div className={`flex gap-2 sm:gap-3 items-center hover:bg-sky-500 rounded p-2 sm:p-3 py-2 cursor-pointer
				${isSelected ? "bg-sky-500": ""}
				`}
				onClick={handleConversationClick}
				>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-10 sm:w-14 rounded-full'>
						<img
							src= {conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-1 sm:gap-3 justify-between items-center'>
						<p className='font-bold text-gray-200 text-sm sm:text-base truncate'>{conversation.fullName}</p>
						<span className='text-base sm:text-xl'>{emoji}</span>
					</div>
					<p className='text-xs text-gray-300 opacity-80 mt-1 hidden sm:block'>
						{isOnline ? 'Active now' : 'Last seen recently'}
					</p>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;