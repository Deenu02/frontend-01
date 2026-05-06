import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
 
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

async function handleLogin(){
    try{
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
            email : email,
            password : password
            }
        )
        toast.success("Login successful")
        console.log(response.data)
        localStorage.setItem("token", response.data.token)

        if(response.data.role === "admin"){
            navigate("/admin")
        }else{
            navigate("/")
        }

    }catch(e){
        toast.error(e.response.data.message)
    }

}

    return(
        <div className="w-full h-screen bg-[url('/login1.jpg')] bg-cover bg-center flex justify-evenly items-center">
            
            <div className="w-[50%] h-full">

            </div>

            <div className="w-[50%] h-full flex justify-center items-center">

                <div className="w-[500px] h-[600px] backdrop-blur-sm rounded-[20px] shadow-2xl flex flex-col justify-center items-center">   

                    <input onChange={(e)=>{
                        setEmail(e.target.value)
                    }
                } 
                value={email}
                type="text" placeholder="Email" className="w-[300px] h-[40px] mt-[50px] bg-white/20 rounded-[10px] text-center text-lg font-bold text-purple-800 placeholder-purple-450 border-2 border-pink-400/70 ring-2 ring-purple-400/40 focus:outline-none focus:ring-purple-500/60 focus:border-pink-500 transition-all duration-300"/>
                     
                    <input onChange={(e)=>{
                        setPassword(e.target.value)
                        }
                    } 
                    value={password}
                    type="password" placeholder="Password" className="w-[300px] h-[40px] mt-[50px] bg-white/20 rounded-[10px] text-center text-lg font-bold text-purple-800 placeholder-purple-450 border-2 border-pink-400/70 ring-2 ring-purple-400/40 focus:outline-none focus:ring-purple-500/60 focus:border-pink-500 transition-all duration-300"/>
                    
                    <button onClick={handleLogin} className="w-[300px] h-[40px] mt-[50px] bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-[10px] text-center text-lg font-bold text-white shadow-lg shadow-purple-400/40 hover:shadow-purple-500/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer">Login</button>
                </div>

            </div>

        </div>
    )
}