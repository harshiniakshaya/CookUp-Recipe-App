import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const MyRecipes = () => {
  const [myrecipes, setMyRecipes] = useState([]);
  const userId = window.localStorage.getItem('id');

  useEffect(() => {
    axios.get(`http://localhost:3001/recipe/myrecipes/${userId}`)
      .then(response => {
        setMyRecipes(response.data); // Set the fetched recipes in the state
        console.log('my recipes fetched');
      })
      .catch(err => console.log(err));
  }, []);

  const deleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      axios.delete(`http://localhost:3001/recipe/deletemyrecipe/${userId}/${recipeId}`)
        .then(response => {
          // Filter out the deleted recipe from the state
          setMyRecipes(myrecipes.filter(recipe => recipe._id !== recipeId));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h2 className="text-center my-4">My Recipes</h2>
      {myrecipes.length === 0 ? (
        <div className="text-center">
          <h3 className="mt-5">You haven't posted any recipes yet!</h3>
          <Link to="/recipe/create-recipe"><button className="btn btn-dark mt-4"> Create Recipe</button></Link>
        </div>
      ) : (
        <div className="row">
          {myrecipes.map(recipe => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={recipe._id}>
            <div className="d-flex justify-content-center">
              <div className="card mb-4" style={{ width: '250px', height: '350px' }} id="myrecipe">
                <img src={recipe.imageUrl} className="card-img-top" alt="Recipe" />
                <div className="card-body text-center">
                  <h5 className="card-title">
                    <Link to={`/read-recipe/${recipe._id}`} className="text-black text-decoration-none">
                      <h3>{recipe.name} </h3>
                    </Link>
                  </h5>
                  <button href="#" className="btn btn-dark px-3 m-2"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete <MdDelete style={{ fontSize: '20px', cursor: 'pointer', textAlign: 'center' }} />
                  </button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
