import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Component to create a new recipe
const CreateRecipe = () => {
     // State to store the recipe data
    const [recipe, setRecipe] = useState({
        name: "",
        description:"",
        ingredients:"",
        imageUrl:"",
        userId: window.localStorage.getItem("id")//store user ID in local storage
    })

    // const [file,setFile]=useState(null);

    // Hook from React Router for navigation
    const navigate = useNavigate();

     // Function to handle changes in input fields
    const handleChange = (event) =>{
        const {name, value} = event.target
        setRecipe({...recipe,[name]:value})
    }

    // const handleUpload = (e) =>{
    //     const formdata = new FormData()
    //     formdata.append('file',file)
    //     axios.post('http:localhost:3001/upload',formdata)
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err))
    // }


    // Function to handle form submission
    const handleSubmit = (event) =>{
        event.preventDefault()
        // API call to create a new recipe
        axios.post('http://localhost:3001/recipe/create-recipe',recipe)
        .then(result =>{
            // Navigate to home page after successful recipe creation
            navigate('/')
            console.log(result.data)
            alert("recipe created")
        })
        .catch(err => {
            alert(err.response.data.message)
        });
    }

  return (
    <>
       <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 border border-3 border-dark w-50'>
            <h3 className='text-center mb-4'>Create Recipe</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='name' className="form-label">Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor='description' className="form-label">Description</label>
                    <input type='text' placeholder='Enter Description' className='form-control' name='description' onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor='ingredients' className="form-label">Ingredients</label>
                    <input type='text' placeholder='Enter Ingredients' className='form-control' name='ingredients' onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor='imageUrl' className="form-label">Image URL</label>
                    <input type='text' placeholder='Enter URL' className='form-control' name='imageUrl' onChange={handleChange} />
                </div>

                {/* <div>
                    <input type="file" onChange={e => setFile(e.target.files[0])}/>
                    <button onClick={handleUpload}>Upload</button>
                </div> */}

                

                <button className='mt-1 btn btn-dark w-100 mt-2 mb-3'>Submit</button>
            </form>
        </div>
        </div> 
    </>
  )
}

export default CreateRecipe