// import { sign } from 'jsonwebtoken'; // ye line kya bolu mai bhosdi ka web devlopment
// iske karan jsonwebtoken frontend mein use ho rha tha galti se jabki iska use bhi nhi
// vscode ne galti se import kar diya aur fir ye external buffer laura lahsun kahne laga 
// ab dekhte hain code chalta hai ya nhi
import {useState} from 'react'
import toast from 'react-hot-toast';
import { json } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({fullName, username, email, password, confirmPassword, gender}) => {
		const success = handleInputErrors({ fullName, username, email, password, confirmPassword, gender });
		if (!success) {
            console.log("not success in handleinput error fn");
            return;
        }
		setLoading(true);
		try {
            console.log("signup fn frontend called");
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender }),
			});
            
            
			const data = await res.json();
            console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}

            // local storage and then update context;
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup


function handleInputErrors({fullName, username, email, password, confirmPassword, gender}){
    if(!fullName || !username || !email || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields.");
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match.")
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters long.")
        return false;
    }
    return true; // hadn't returned this earlier so it returned false for some reason and it fked up my code ):
}