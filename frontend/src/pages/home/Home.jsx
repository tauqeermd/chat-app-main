import React from 'react'

import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { showMessageContainer } = useConversation();
	
	return (
		<div className='flex flex-col md:flex-row h-[90vh] md:h-screen w-full md:w-full mx-auto 
		rounded-lg md:rounded-none overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 shadow-xl md:shadow-none'>
			{/* On mobile, show sidebar when no message container is active */}
			<div className={`${showMessageContainer ? 'hidden' : 'flex flex-col'} md:flex md:flex-col`}>
				<Sidebar />
			</div>
			
			{/* On mobile, show message container when active */}
			<div className={`${showMessageContainer ? 'flex flex-col' : 'hidden'} md:flex md:flex-1 md:flex-col`}>
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;
