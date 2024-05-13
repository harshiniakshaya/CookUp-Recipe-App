import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../components/Home.css"
import { MdDelete } from "react-icons/md";
import Nav from './Nav';

const ReadRecipe = () => {
    // Get the recipe ID from the URL parameters
    const {id} = useParams();
    // Get the logged-in user ID from local storage
    const userId = window.localStorage.getItem("id");
    // State variables to store the recipe details and saved recipes
    const [recipe,setRecipe] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    // Function to fetch the recipe details by ID
    useEffect(()=>{
        const getRecipe = () =>{
            axios.get('http://localhost:3001/recipe/recipe-by-id/'+id)
            .then(result => {
                setRecipe(result.data)
            })
            .catch(err => console.log(err))
        }

        // Function to fetch the saved recipes for the logged-in user
        const fetchSavedRecipes = () =>{
            axios.get('http://localhost:3001/recipe/saved-recipes/'+userId)
            .then(result => {
                // console.log(result);
                setSavedRecipes(result.data)
            })
            .catch(err => console.log(err))
        }

        // Fetch recipe details and saved recipes when the component mounts
        if(userId){
            fetchSavedRecipes()
        }
        getRecipe()
    },[])

    // Function to save a recipe
    // const savedRecipe = (recipeId) => {
    //     axios.put("http://localhost:3001/recipe", { userId, recipeId })
    //     .then(result => {
    //         setSavedRecipes(result.data.savedRecipes);
    //     })
    //     .catch(err => console.log(err));
    // }


    const toggleSavedRecipe = (recipeId) => {
        if (isRecipeSaved(recipeId)) {
            // If the recipe is already saved, remove it from saved recipes
            axios.delete(`http://localhost:3001/recipe/${userId}/${recipeId}`)
            .then(result => {
                setSavedRecipes(result.data.savedRecipes);
            })
            .catch(err => console.log(err));
        } else {
            // If the recipe is not saved, save it
            axios.put("http://localhost:3001/recipe", { userId, recipeId })
            .then(result => {
                setSavedRecipes(result.data.savedRecipes);
            })
            .catch(err => console.log(err));
        }
    }




    // Function to check if a recipe is saved by the user
    const isRecipeSaved = (id) => {
        // console.log("savedRecipes:", savedRecipes);
        // console.log("recipeId:", id);
        // Check if savedRecipes contains the current recipe ID
        return savedRecipes && savedRecipes.includes(id);
    }
    
    
    

  return (
    <>
    {/* <div className='d-flex justify-content-center container mt-5'>
        <div className='p-2'>
        <img  src={recipe.imageUrl} alt='' className='recipe-image'/>
        </div>
        <div className='p-2'>
        <h2>{recipe.name}</h2>
            {userId && <button className='btn btn-warning' 
                onClick={() => toggleSavedRecipe(recipe._id)}
            >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>}
            
            <h3>Description</h3>
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <p>{recipe.ingredients}</p>
        
        </div>
    </div> */}
    <div className='section ' id="read-recipe-id">
        <div className='container-fuild'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-12 text-center d-flex justify-content-center align-items-center'>
                    <img src={recipe.imageUrl} className='img-fluid'/>
                </div>
                <div className='col-lg-6 col-md-6 col-12 text-center '>
                    <h1 className='mt-2'>{recipe.name}</h1>
                        {userId && <button className='btn btn-dark mb-2' 
                                        onClick={() => toggleSavedRecipe(recipe._id)}
                                    >
                                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                    </button>}
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                    <h3>Ingredients</h3>
                    <p>{recipe.ingredients}</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ReadRecipe