import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/Home.css"
import { Link } from 'react-router-dom';

// SavedRecipe component to display saved recipes
const SavedRecipe = () => {
  // State to store saved recipes
  const [savedrecipes,setSavedRecipes] = useState([])
  // Get the logged-in user ID from local storage
  const userId = window.localStorage.getItem("id");
  useEffect(()=>{

    // Fetch saved recipes when the component mounts
    axios.get('http://localhost:3001/recipe/user-recipes/'+userId)
    .then(response => {
      setSavedRecipes(response.data); // Set the fetched recipes in the state
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h2>Saved Recipes</h2>
        {savedrecipes.length === 0 ? ( // Check if saved recipes array is empty
          <p className="text-center">No saved recipes</p>
        ) : (
          savedrecipes.map(recipe => (
            <div key={recipe._id} className='mt-4 p-3 border'>
              <Link to={`/read-recipe/${recipe._id}`} className='text-decoration-none'>
                <h3>{recipe.name}</h3>
              </Link>
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SavedRecipe