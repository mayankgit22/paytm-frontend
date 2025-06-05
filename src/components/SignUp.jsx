import  { useState } from 'react'
import { Input } from '@headlessui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


    function SignUp() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();
        const handleSubmit = async () => {
            try{
                const response = await axios.post('https://paytm-backend-1-6y9o.onrender.com/user/signup', {
                    name,
                    email,
                    password
                },{
                    withCredentials: true // This is important to include cookies in the request
                }).then(res => {
                    console.log("Sign up successful:", res.data);
                    // alert("Sign up successful! Please log in.");
                    localStorage.setItem('userId', res.data.user.id); // Store user ID in localStorage
                    navigate('/Dashboard');
                }).catch(error => {
                    console.error("Error signing up:", error);
                });
            }catch(error){
                console.error("Error signing up:", error);
            }
        };

        return (
            <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">

            <div className="flex flex-col items-center justify-center w-1/2 h-96 p-2 md:w-1/4 md:h-96 bg-gray-500 rounded-xl text-black">
                <h1 className="text-2xl text-white font-bold mb-4">Sign Up</h1>
                <Input onChange={(e)=>setName(e.target.value)} name="full_name" placeholder='Enter Your FullName' type="text" className="border md:font-semibold md:text-md text-sm m-1 p-1 md:m-2 w-3/4 md:p-2 rounded-3xl bg-gray-200 data-focus:bg-white data-hover:shadow" />
                <Input onChange={(e)=>setEmail(e.target.value)} name="email" placeholder='Enter Your Email' type="email" className="border md:font-semibold md:text-md text-sm m-1 p-1 md:m-2 md:p-2 w-3/4 rounded-3xl bg-gray-200 data-focus:bg-white data-hover:shadow" />
                <Input onChange={(e)=>setPassword(e.target.value)} name="password" placeholder='Enter Your Password' type="password" className="p-1 w-3/4 md:font-semibold md:text-md text-sm border rounded-3xl m-1 md:m-2 md:p-2 bg-gray-200 data-focus:bg-white data-hover:shadow" /><br />
      <button onClick={handleSubmit} className="bg-violet-600 hover:bg-violet-700 font-semibold sm:font-bold sm:w-1/3 focus:outline-2 focus:outline-offset-2 p-2 cursor-pointer focus:outline-violet-500 rounded-4xl active:bg-violet-700 ...">
  Sign Up
</button>
<a href="/signin" className="text-sm text-blue-100 hover:underline">Already have an account? Sign in</a>
            </div></div>
        )
    }

export default SignUp
