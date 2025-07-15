import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import Navbar from '../pages/Navbar';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const addOrUpdateTodoHandler = async () => {
    try {
      const payload = { title, description };

      if (editId) {
        // Update existing todo
        const res = await axios.put(`http://localhost:8000/api/v1/todo/${editId}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast({ description: res.data.message, variant: "default" });
          setEditId(null); // Clear edit state
        }
      } else {
        // Add new todo
        const res = await axios.post("http://localhost:8000/api/v1/todo", payload, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast({ description: res.data.message, variant: "default" });
        }
      }

      setTitle("");
      setDescription("");
      fetchTodos(); // Refresh the list of todos
    } catch (error) {
      toast({ description: error.response.data.message, variant: "destructive" });
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todo", { withCredentials: true });
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      toast({ description: error.response.data.message, variant: "destructive" });
      if(error.response.data.message === "User not authenticated")
      {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/todo/${todoId}`, { withCredentials: true });
      if (res.data.success) {
        toast({ description: res.data.message, variant: "default" });
        fetchTodos(); // Refresh the list of todos
      }
    } catch (error) {
      toast({ description: error.response.data.message, variant: "destructive" });
    }
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center gap-4 mt-10'>
        <Input
          type="text"
          placeholder="Add Todo Title"
          className="text-white w-1/4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          type="text"
          placeholder="Add Todo Description"
          className="text-white w-1/4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={addOrUpdateTodoHandler}>
          {editId ? "Update Todo" : "Add Todo"}
        </Button>
      </div>

      {todos.map((todo) => (
        <div key={todo._id} className='flex items-center gap-4 mt-10'>
          <h2 className='text-white font-bold'>{todo.title} :</h2>
          <div className='text-white'>{todo.description}</div>
          <Button onClick={() => deleteTodo(todo._id)}>Delete</Button>
          <Button onClick={() => editTodo(todo)}>Edit</Button>
        </div>
      ))}
    </div>
  );
};

export default Home;
