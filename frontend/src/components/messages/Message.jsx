import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	// console.log(message.message + "what is it the message");
	const { authUser } = useAuthContext();
	// console.log(authUser);
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id; // don't use _id just use id
	// as authUser object has the field id only not _id
	// this _id field not being there was happening due to 
	// login part backend where it was sending _id as id
	// i have changed it so there should be no problem
	// console.log("sender id"+ message.senderId + " authUser id: " + authUser._id);
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-8 sm:w-10 rounded-full'>
					<img alt='User profile picture' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 text-sm sm:text-base max-w-[75%] sm:max-w-[70%] break-words`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-[10px] sm:text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default Message;


/* text-white ${bubbleBgColor} */

// STARTER CODE: 
// const Message = ({ message }) => {
// 	// const { authUser } = useAuthContext();
// 	// const { selectedConversation } = useConversation();
// 	// const fromMe = message.senderId === authUser._id;
// 	// const formattedTime = extractTime(message.createdAt);
// 	// const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	// const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	// const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	// const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className='chat chat-end'>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white bg-blue-500  pb-2`}>Hi what is upp?</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
// 		</div>
// 	);
// };
// export default Message;