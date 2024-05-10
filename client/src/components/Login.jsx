import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate()


    //MVC -> request to the server(controller)
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/auth/login',{username,password})
        .then(res=>{
            console.log(res.data);
            if(typeof res.data.id !== 'undefined'){
                window.localStorage.setItem("id",res.data.id)
            }
            else{
                alert(res.data.message);
            }
            navigate('/')
            console.log(res)
        })
        .catch(err=>console.log(err))
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 border border-1 w-25'>
            <h3>LOGIN</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text'placeholder='Enter Username' className='form-control'
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='username'>Password</label>
                    <input type='password' placeholder='Enter Password' className='form-control'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button className='mt-1 btn btn-success w-100'>Login</button>
                <Link to="/auth/register"><button className='btn btn-default w-100 mt-2 border'>Register</button></Link>
            </form>
        </div>
    </div>
  )
}

export default Login