import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from '../hooks/use-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () =>{
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout');
      if (res.data.success) {
          toast({
              description:res.data.message
          })
          navigate("/login");
      }
  } catch (error) {
      toast({
          description: error.response.message,
          variant: "destructive"
      })

  }
  }
  return (
    <div className='flex items-center justify-between bg-gray-600 p-3 rounded'>
      <h1 className='text-white font-semibold'>My Todo App</h1>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default Navbar