import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  // runs only once this useEffect, we put an empty dependence array
  useEffect(() => {
    const getConversations = async () =>{
        setLoading(true);
        try {
            
            const res = await fetch("/api/users")// GET request so no need to pass any objects
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally{
          setLoading(false);
        }
    };

    getConversations();
  }, []);

  return {loading, conversations};
};

export default useGetConversations;
