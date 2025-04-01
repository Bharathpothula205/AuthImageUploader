import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../App.css'

const Login = () => {
  const navigate=useNavigate();
  const [Form,setForm]=useState({email:"",password:""});
  const handleChange=(e)=>{
setForm({...Form,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
e.preventDefault();
try {
  const res=await axios.post("http://localhost:5000/api/auth/login",Form);
  alert("logined succesfully!!!");
  localStorage.setItem("token",res.data.token);
  alert(res.data.user.id);
  navigate('/profile');
} catch (error) {
  alert("login failed");
}
  }
  return (
    <div>
     <form className='form-container' onSubmit={handleSubmit}>
      <input name="email" placeholder="enter the email" type='email' onChange={handleChange}/>
      <input name="password" placeholder="enter the password" type='password' onChange={handleChange}/>
      <button type='submit'>Login</button>
     </form>
    </div>
  )
}

export default Login
