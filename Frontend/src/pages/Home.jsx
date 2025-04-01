import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../App.css'

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className='form'>
      <button onClick={()=>navigate('/register')}>Register</button>
      <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Home
