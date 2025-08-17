import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='border-r border-slate-500 flex flex-col w-full md:w-[350px] lg:w-[400px] xl:w-[420px] h-screen'>
			<div className="bg-gray-700 p-3 sm:p-4 sticky top-0 z-10 shadow-md">
				<div className="flex items-center justify-between mb-4 pt-1">
					<div className="flex items-center gap-3">
						<div className="avatar">
							<div className="w-10 sm:w-12 rounded-full">
								<img src={authUser?.profilePic} alt="User profile" />
							</div>
						</div>
						<div>
							<h1 className="text-lg sm:text-xl font-bold text-white">{authUser?.fullName}</h1>
							<p className="text-xs text-gray-300">@{authUser?.username}</p>
						</div>
					</div>
					<LogoutButton />
				</div>
				<SearchInput />
			</div>
			<Conversations />
		</div>
	);
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;