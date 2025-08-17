import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState(""); 
	const {loading, login} = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] min-w-96 mx-auto'>
			<div className='w-full max-w-md p-8 rounded-xl shadow-lg bg-white bg-opacity-95 border border-gray-200'>
				<div className='mb-6 text-center'>
					<h1 className='text-3xl font-bold text-gray-800'>
						Welcome back
					</h1>
					<p className='text-gray-600 mt-2'>Sign in to <span className='text-blue-600 font-medium'>ChatApp</span></p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-5'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Username
						</label>
						<div className='relative'>
							<input 
								type='text' 
								placeholder='Enter your username' 
								className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
								value={username} 
								onChange={(e) => {setUsername(e.target.value)}}
							/>
						</div>
					</div>

					<div>
						<div className='flex justify-between items-center mb-1'>
							<label className='block text-sm font-medium text-gray-700 ml-1'>
								Password
							</label>
							<Link to='/forgot-password' className='text-xs text-blue-600 hover:text-blue-800 font-medium'>
								Forgot password?
							</Link>
						</div>
						<div className='relative'>
							<input
								type='password'
								placeholder='Enter your password'
								className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<button 
						className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
						disabled={loading}
					>
						{loading ? (
							<div className='flex items-center justify-center'>
								<svg className='animate-spin -ml-1 mr-2 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
									<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
									<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
								Signing in...
							</div>
						) : "Sign in"}
					</button>
				</form>

				<div className='mt-6 text-center text-sm'>
					<span className='text-gray-600'>Don't have an account? </span>
					<Link to={'/signup'} className='text-blue-600 hover:text-blue-800 font-medium'>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Login;


// DRIVER CODE FOR LOGIN
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>
// 					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;