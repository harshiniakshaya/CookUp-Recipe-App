import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

// Component to display a list of recipes
const Home = () => {
  // State to store the fetched recipes
  const [recipes,setRecipes] = useState([])

  const [usernames, setUsernames] = useState({});
  // Fetch recipes from the API when the component mounts
  useEffect(()=>{
    axios.get('http://localhost:3001/recipe/recipes')
    .then(response => {
      setRecipes(response.data); // Set the fetched recipes in the state
      response.data.forEach(recipe => {
        findName(recipe.userId);
      });
    })
    .catch(err => console.log(err))
  },[])

  const findName = (id)=>{
    
      axios.get(`http://localhost:3001/auth/find-username/${id}`)
      .then(result =>{
        setUsernames(prevState => ({
          ...prevState,
          [id]: result.data.username // Store the username in the state
        }));
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div className='section'>
      <div className='container'>
        <h2 className='text-center my-4'>Recipes</h2>
        <div className='row'>
          {
            recipes.map(recipe=>(
              <div className='col-lg-4 col-md-4 col-12' key={recipe._id}>
                <div className="d-flex justify-content-center">
                  <div className="card mb-4" style={{ width: '18rem',height: '350px' }} id="recipe">
                      <img src={recipe.imageUrl} className="card-img-top recipe-image"/>
                      <div className="card-body text-center" >
                          <h5 className="card-title"><strong>{recipe.name}</strong></h5>
                          <p className="card-text p-2" style={{ height: '30px', overflowY: 'hidden',fontSize:'12px'}}>Created by {usernames[recipe.userId]}</p>
                          <Link to={`/read-recipe/${recipe._id}`} className='text-decoration-none'>
                            <button className='btn btn-dark'>View Recipe</button>
                          </Link>
                      </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home