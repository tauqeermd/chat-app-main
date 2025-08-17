import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is valid
    const verifyToken = async () => {
      try {
        // You can add a token verification endpoint if needed
        // For now, we'll just assume the token is valid
        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
        toast.error('Password reset link is invalid or has expired');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/password/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Password has been reset successfully');
        navigate('/login');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isTokenValid === false) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] w-[95%] sm:min-w-96 mx-auto'>
        <div className='w-full max-w-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white bg-opacity-95 border border-gray-200'>
          <div className='text-center'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Invalid Link</h1>
            <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>The password reset link is invalid or has expired.</p>
            <Link 
              to='/forgot-password'
              className='w-full inline-block py-2 sm:py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Request a new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] w-[95%] sm:min-w-96 mx-auto'>
      <div className='w-full max-w-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white bg-opacity-95 border border-gray-200'>
        <div className='mb-4 sm:mb-6 text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
            Reset Password
          </h1>
          <p className='text-sm sm:text-base text-gray-600 mt-2'>Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
          <div>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1'>
              New Password
            </label>
            <input 
              type='password' 
              placeholder='Enter new password' 
              className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-xs sm:text-sm font-medium text-gray-700 mb-1 ml-1'>
              Confirm New Password
            </label>
            <input 
              type='password' 
              placeholder='Confirm new password' 
              className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button 
            className='w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Resetting Password...
              </div>
            ) : "Reset Password"}
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

export default ResetPassword;
