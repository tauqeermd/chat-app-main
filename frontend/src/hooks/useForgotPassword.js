import { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  
  const sendPasswordResetEmail = async (email) => {
    if (!email) {
      toast.error('Please enter your email address');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/password/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || 'If an account with that email exists, we have sent password reset instructions');
        return true;
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send password reset email');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, sendPasswordResetEmail };
};

export default useForgotPassword;
