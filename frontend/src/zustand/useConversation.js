// import {create} from 'zustand';

// const useConversation = create((set) => ({
//     // returning an object through create function
//     selectedConversation: null,
//     setSelectedConversation: (selectedConversation) => set({selectedConversation}),
//     messages: [],
//     setMessages: (messages) => set({ messages }),
// }))

// export default useConversation;

import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	showMessageContainer: false, // For mobile navigation
	setShowMessageContainer: (showMessageContainer) => set({ showMessageContainer }),
}));

export default useConversation;
