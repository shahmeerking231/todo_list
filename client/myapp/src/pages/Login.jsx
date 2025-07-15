import { useState } from 'react'
import axios from 'axios'
import { toast } from '../hooks/use-toast'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const loginHandler = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            );
            if (res.data.success) {
                toast({
                    description: res.data.message,
                })
                navigate("/")
            }
        } catch (error) {
            toast({
                description: error.response.data.message,
                variant: "destructive"
            })

        }
    }
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className='flex items-center justify-center h-[80vh]'>
        <fieldset className='text-white flex flex-col items-center justify-center gap-9 border-2 border-white rounded-md p-5 w-[27vw] h-[59vh]'>
            <legend className='text-white font-semibold text-lg'>Login</legend>
            <Input value={user.email} name="email" onChange={changeHandler} type="email" placeholder="Email" className='w-[20vw]'/>
            <Input value={user.password} name="password" onChange={changeHandler} type="password" placeholder="Password" className='w-[20vw]'/>
            <Button onClick={loginHandler}>Login</Button>
        </fieldset>
        </div>
    )
}
export default Login