import React, { useState } from 'react'
import GenderCheckbox from "./GenderCheckbox";
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => { 

  const [inputs, setInputs] = useState({
    fullName:"",
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    gender:''
  })

  const {loading, signup} = useSignup();

  const handleCheckboxChange = (gender) =>{
    setInputs({... inputs, gender});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await signup(inputs);
  }

	return (
		<div className='flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] min-w-96 mx-auto'>
			<div className='w-full max-w-md p-8 rounded-xl shadow-lg bg-white bg-opacity-95 border border-gray-200'>
				<div className='mb-6 text-center'>
					<h1 className='text-3xl font-bold text-gray-800'>
						Create Account
					</h1>
					<p className='text-gray-600 mt-2'>Join <span className='text-blue-600 font-medium'>ChatApp</span> today</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Full Name
						</label>
						<input 
              type='text' 
              placeholder='John Doe' 
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={inputs.fullName}
              onChange={(e) => setInputs({... inputs, fullName : e.target.value})}
            />
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Username
						</label>
						<input 
              type='text' 
              placeholder='johndoe' 
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={inputs.username}
              onChange={(e) => setInputs({... inputs, username : e.target.value})}
            />
					</div>

          <div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Email Address
						</label>
						<input 
              type='email' 
              placeholder='john.doe@example.com' 
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={inputs.email}
              onChange={(e) => setInputs({... inputs, email : e.target.value})}
            />
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Password
						</label>
						<input
							type='password'
							placeholder='Create a strong password'
							className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
              value={inputs.password}
              onChange={(e) => setInputs({... inputs, password : e.target.value})}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Confirm Password
						</label>
						<input
							type='password'
							placeholder='Confirm your password'
							className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({... inputs, confirmPassword : e.target.value})}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1 ml-1'>
							Gender
						</label>
						<GenderCheckbox onCheckBoxChange={handleCheckboxChange} selectedGender={inputs.gender} />
					</div>

					<button 
						className='w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
						disabled={loading}
					>
						{loading ? (
							<div className='flex items-center justify-center'>
								<svg className='animate-spin -ml-1 mr-2 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
									<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
									<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
								Creating account...
							</div>
						) : "Create Account"}
					</button>

					<div className='mt-6 text-center text-sm'>
						<span className='text-gray-600'>Already have an account? </span>
						<Link to={'/login'} className='text-blue-600 hover:text-blue-800 font-medium'>
							Sign in instead
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;




// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
// 					</div>

// 					<div>
// 						<label className='label p-2 '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
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

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<GenderCheckbox />

// 					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
// 						Already have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;



