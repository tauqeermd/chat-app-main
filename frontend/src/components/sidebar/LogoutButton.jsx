import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div>
			{!loading ? (            
				<button 
					onClick={logout}
					className="flex items-center gap-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded-md transition-colors"
				>
					<BiLogOut className='w-4 h-4 sm:w-5 sm:h-5' />
					<span className="text-xs hidden sm:inline">Log Out</span>
				</button>             
			) : (
				<span className='loading loading-spinner loading-xs'></span>
			)}
		</div>
	);
};
export default LogoutButton;