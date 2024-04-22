import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  const [recipes,setRecipes] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/recipe/recipes')
    .then(response => {
      setRecipes(response.data); // Set the fetched recipes in the state
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h2>Recipes</h2>
        {
          recipes.map(recipe => (
            <div key={recipe._id} className='mt-4 p-3 border'> 
              <Link to={`/read-recipe/${recipe._id}`} className='text-decoration-none'>
                <h3>{recipe.name}</h3>
              </Link>
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home