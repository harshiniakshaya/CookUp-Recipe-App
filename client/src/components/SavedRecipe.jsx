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
    <>
    {/* <div className='d-flex justify-content-center'>
      <div>
        <h2>Saved Recipes</h2>
        {savedrecipes.length === 0 ? ( // Check if saved recipes array is empty
        <>
          <h3 className="text-center mt-5">You haven't saved any recipes!</h3>
    
        </>
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
    </div> */}
    <div className='section'>
      <div className='container'>
        <h2 className='text-center my-4'>Saved Recipes</h2>
        {savedrecipes.length === 0 ?(
          <>
            <h3 className="text-center mt-5">You haven't saved any recipes!</h3>
          </>
        ):(
          <div className='row'>
          {
            savedrecipes.map(recipe=>(
              <div className='col-lg-4 col-md-4 col-12' key={recipe._id}>
                <div className="d-flex justify-content-center">
                  <div className="card mb-4" style={{ width: '18rem',height: '320px' }} id="recipe">
                      <img src={recipe.imageUrl} className="card-img-top"/>
                      <div className="card-body text-center" >
                          <h5 className="card-title"><strong>{recipe.name}</strong></h5>
            
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
        )}
        
      </div>
    </div>
    </>
  )
}

export default SavedRecipe