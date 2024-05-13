import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

// Registration component
const Registration = () => {
    // State variables to store username and password
    const [username, setUsername] = useState('');
    const[password,setPassword] = useState('');

    // Hook from React Router for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) =>{
        e.preventDefault()

         // Send registration request to the server
        axios.post('http://localhost:3001/auth/register',{username,password})
        .then(res=>{
            navigate('/auth/login') // Redirect to login page after successful registration
            console.log(res)
        })
        .catch(err=>console.log(err))
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-5 border border-3 w-auto'>
            <h3 className='text-center fw-bold '>REGISTER</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username'>Username</label>
                    <input type='text'placeholder='Enter Username' className='form-control'
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='username'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-control'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button className='mt-1 btn btn-dark w-100'>Submit</button>
                <Link to="/auth/login"><button className='btn btn-light w-100 mt-2 border'>Login</button></Link>
            </form>
        </div>
    </div>
  )
}

export default Registration