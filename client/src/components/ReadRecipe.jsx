import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../components/Home.css"

const ReadRecipe = () => {
    const {id} = useParams();
    const userId = window.localStorage.getItem("id");
    const [recipe,setRecipe] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    useEffect(()=>{
        const getRecipe = () =>{
            axios.get('http://localhost:3001/recipe/recipe-by-id/'+id)
            .then(result => {
                setRecipe(result.data)
            })
            .catch(err => console.log(err))
        }
        const fetchSavedRecipes = () =>{
            axios.get('http://localhost:3001/recipe/saved-recipes/'+userId)
            .then(result => {
                // console.log(result);
                setSavedRecipes(result.data)
            })
            .catch(err => console.log(err))
        }
        if(userId){
            fetchSavedRecipes()
        }
        getRecipe()
    },[])

    const savedRecipe = (recipeId) => {
        axios.put("http://localhost:3001/recipe", { userId, recipeId })
        .then(result => {
            setSavedRecipes(result.data.savedRecipes);
        })
        .catch(err => console.log(err));
    }

    const isRecipeSaved = (id) => {
        // console.log("savedRecipes:", savedRecipes);
        // console.log("recipeId:", id);
        // Check if savedRecipes contains the current recipe ID
        return savedRecipes && savedRecipes.includes(id);
    }
    
    
    

  return (
    <div className='d-flex justify-content-center container mt-3'>
        <div className='p-2'>
        <img  src={recipe.imageUrl} alt='' className='recipe-image'/>
        </div>
        <div className='p-2'>
        <h2>{recipe.name}</h2>
            {userId && <button className='btn btn-warning' 
                onClick={() => savedRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
            >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>}
            <h3>Description</h3>
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <p>{recipe.ingredients}</p>
        
        </div>
    </div>
  )
}

export default ReadRecipe