import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useForgotPassword from '../../hooks/useForgotPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const { loading, sendPasswordResetEmail } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    const success = await sendPasswordResetEmail(email);
    
    if (success) {
      setMessage({ 
        text: 'If an account with this email exists, password reset instructions have been sent', 
        type: 'success' 
      });
      setEmail('');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] w-[95%] sm:min-w-96 mx-auto'>
      <div className='w-full max-w-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white bg-opacity-95 border border-gray-200'>
        <div className='mb-4 sm:mb-6 text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
            Forgot Password
          </h1>
          <p className='text-sm sm:text-base text-gray-600 mt-2'>Enter your email to receive a password reset link</p>
        </div>

        {message.text && (
          <div className={`mb-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
          <div>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1'>
              Email Address
            </label>
            <input 
              type='email' 
              placeholder='Enter your email address' 
              className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            className='w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm'
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Sending...
              </div>
            ) : "Send Reset Link"}
          </button>
        </form>

        <div className='mt-4 sm:mt-6 text-center text-xs sm:text-sm'>
          <span className='text-gray-600'>Remember your password? </span>
          <Link to={'/login'} className='text-blue-600 hover:text-blue-800 font-medium'>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
