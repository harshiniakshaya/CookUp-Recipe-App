import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

// Component for user login
const Login = () => {
    // State variables to store username and password
    const [username, setUsername] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate()


    axios.defaults.withCredentials = true;

    // Function to handle form submission
    const handleSubmit = (e) =>{
        e.preventDefault()

        // Sending login request to the server
        axios.post('http://localhost:3001/auth/login',{username,password})
        .then(res=>{
            console.log(res.data);
            if(typeof res.data.id !== 'undefined'){
                // If login is successful, store user ID in local storage
                window.localStorage.setItem("id",res.data.id)
            }
            else{
                // If login fails, display error message
                alert(res.data.message);
            }
            // Navigate to home page
            navigate('/')
            console.log(res)
        })
        .catch(err=>console.log(err))
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-5 border border-3 w-auto '>
            <h3 className='text-center fw-bold '>LOGIN</h3>
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
                <button className='mt-1 btn btn-dark w-100'>Login</button>
                <Link to="/auth/register"><button className='btn btn-light w-100 mt-2 border'>Register</button></Link>
            </form>
        </div>
    </div>
  )
}

export default Login