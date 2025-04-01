import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../App.css'

const Register = () => {
  const navigate=useNavigate();
  const [Form,setForm]=useState({username:"",email:"",password:""});
  const handleChange=(e)=>{
    console.log("e.target",e.target);
    setForm({...Form,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
       e.preventDefault();
       try {
        const res=await axios.post("http://localhost:5000/api/auth/register",Form);
        alert("succesfullt registered!!");
        navigate('/login');
       } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "registration failed");
       }
    
  }
  return (
    <div>
    <form className='form-container' onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Enter a username" type="username" onChange={handleChange} />
      <input name="email" placeholder="Enter a email" type="email" onChange={handleChange} />
      <input name="password" placeholder="Enter a password" type="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
    </div>
  )
}

export default Register
