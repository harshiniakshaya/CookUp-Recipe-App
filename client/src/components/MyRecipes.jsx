import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const MyRecipes = () => {
  const [myrecipes,setMyRecipes] = useState([])
  const userId = window.localStorage.getItem("id");
  useEffect(()=>{

    axios.get('http://localhost:3001/recipe/myrecipes/'+userId)
    .then(response => {
      setMyRecipes(response.data); // Set the fetched recipes in the state
      console.log("my recipes fetched")
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h2>My Recipes</h2>
        {myrecipes.length === 0 ? ( // Check if saved recipes array is empty
          <p className="text-center">No saved recipes</p>
        ) : (
          myrecipes.map(recipe => (
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

export default MyRecipes