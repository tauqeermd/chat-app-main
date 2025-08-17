import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
	const [search, setSearch] = useState(""); 
	const {setSelectedConversation} = useConversation();
	const {conversations} = useGetConversations();
	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!search) return;
		if(search.length < 3){
			return toast.error('Search term must be atleast 3 characters long');
		}
		const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
		if(conversation){
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	}
	return (
		<form onSubmit={handleSubmit}
		className='flex items-center gap-2 sm:gap-3'>
			<div className="relative flex-grow">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<IoSearchSharp className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400' />
				</div>
				<input type='text' 
				placeholder='Search contacts...' 
				className='input input-bordered rounded-full text-sm sm:text-base py-2 px-4 ps-10 sm:ps-12 sm:py-3 sm:px-5 h-auto min-h-0 sm:min-h-[2.8rem] w-full bg-gray-700 border-gray-600' 
				value={search}  
				onChange={(e)=> setSearch(e.target.value)}
				/>
			</div>
			<button type='submit' className='btn btn-circle bg-sky-500 hover:bg-sky-600 text-white h-9 w-9 sm:h-11 sm:w-11 min-h-0 flex items-center justify-center'>
				<IoSearchSharp className='w-4 h-4 sm:w-5 sm:h-5 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;