import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {

	const {loading, conversations} = useGetConversations();
	console.log("CONVERSATIONS: ", conversations);
	return (
		<div className='py-2 sm:py-3 flex flex-col overflow-auto h-[calc(100vh-120px)] md:h-[calc(100vh-130px)]'>
			<h2 className="text-base sm:text-lg font-medium text-gray-200 px-2 mb-2">Recent Chats</h2>
		{
			conversations.length > 0 ? conversations.map((conversation, idx) => (
				<Conversation
				key={conversation._id}
				conversation = {conversation}
				emoji = {getRandomEmoji()}
				lastIdx = {idx == conversations.length - 1}
				/>
			)) : !loading && <p className="text-center text-sm text-gray-400 py-3">No conversations yet</p>
		}
			{loading ? <div className="flex justify-center py-4"><span className="loading loading-spinner"></span></div> : null}
		</div>
	);
};
export default Conversations;


// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;