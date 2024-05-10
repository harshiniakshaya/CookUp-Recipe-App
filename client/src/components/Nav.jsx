import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


// Navigation Bar component
const Nav = () => {
    const navigate = useNavigate();
    const userId = window.localStorage.getItem("id");
    const isLoggedIn = !!userId; // Check if user is logged in

    // !!: The double exclamation marks !! are used to convert any value into its boolean equivalent. It's a common JavaScript idiom used to ensure that a value is strictly converted to either true or false.
    // console.log(userId);
    // console.log(isLoggedIn)

    // Function to handle logout
    const handleLogout = () =>{ 
        window.localStorage.clear(); // Clear user ID from local storage

        // Send logout request to the server
        axios.get('http://localhost:3001/auth/logout')
        .then(result => {
            navigate('/'); // Redirect to home page
            // window.location.reload();
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container-fluid'>
                
                <Link className='navbar-brand' to="/">
                    Food Recipe
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarTogglerDemo01">
                    <ul className='navbar-nav ms-2 me-auto mb-2 mb-lg-0'>
                    {isLoggedIn && (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link text-white' to="/recipe/create-recipe" aria-current="page">
                                            Create
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link text-white' to="/recipe/saved-recipe">
                                            Saved Recipe
                                        </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                    {
                        isLoggedIn?
                            <button className='btn btn-outline-light'
                                onClick={handleLogout}
                            >
                            Logout
                            </button>
                        :
                        <button className='btn btn-outline-light'>
                            <Link to="/auth/login" className='text-decoration-none'>Login/Register</Link>
                        </button>
                    }
                    
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Nav
