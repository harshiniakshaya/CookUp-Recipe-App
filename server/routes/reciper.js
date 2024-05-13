const express = require('express')
const RecipeModel = require('../models/Recipe')
const UserModel = require('../models/User')

const router = express.Router()

router.post('/create-recipe',(req,res)=>{
    RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    })
    .then(result=>{
        return res.json(result)
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({message:'Give all details to create a recipe!'})
    });
})

router.get('/recipes',(req,res)=>{
    RecipeModel.find()
    .then(recipes =>{
        return res.json(recipes)
    })
    .catch(err => res.json(err));
})

router.get('/recipe-by-id/:id',(req,res)=>{
    const id = req.params.id;
    RecipeModel.findById({_id:id})
    .then(result =>{
        return res.json(result)
    })
    .catch(err => res.json(err));
})

router.get('/saved-recipes/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(result => {
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(result);
        return res.json(result.savedRecipes);
    })
    .catch(err => res.status(500).json({ error: err.message }));
})

router.get('/user-recipes/:id',async (req,res)=>{
    const id = req.params.id;
    try {
        const user = await UserModel.findById({_id:id});
        const recipes = await RecipeModel.find({
            _id : {$in : user.savedRecipes}
        })
        res.status(201).json(recipes);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/myrecipes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const recipes = await RecipeModel.find({
            userId: id
        });
        // console.log(recipes)
        res.status(200).json(recipes); // Sending retrieved recipes in the response
    } catch (err) {
        res.status(500).json(err); // Sending error response in case of an error
    }
});


// router.put('/',async (req,res) =>{
//     const recipe = await RecipeModel.findById({_id: req.body.recipeId})
//     const user = await UserModel.findById({_id: req.body.id})
//     // user.savedRecipes.push(recipe)
//     if (user) {
//         if (!user.savedRecipes) {
//             user.savedRecipes = []; // Initialize savedRecipes array if it doesn't exist
//         }
//         user.savedRecipes.push(recipe);
//     } else {
//         console.log("User not found.");
//     }
//     user.save()
//     return res.json({savedRecipes : user.savedRecipes})
// })

router.put('/', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.savedRecipes) {
            user.savedRecipes = [];
        }
        user.savedRecipes.push(recipe);
        await user.save();

        return res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:userId/:recipeId', async (req, res) => {
    try {
        // console.log('api reached')
        const recipeId = req.params.recipeId;
        const userId = req.params.userId;
        // console.log(recipeId,userId)
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.savedRecipes || !user.savedRecipes.includes(recipeId)) {
            return res.status(404).json({ error: "Recipe not found in user's saved recipes" });
        }

        user.savedRecipes = user.savedRecipes.filter(savedRecipeId => savedRecipeId.toString() !== recipeId);
        await user.save();

        return res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/deletemyrecipe/:userId/:recipeId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;

        // Find the recipe by ID and the user ID
        const recipe = await RecipeModel.findOne({ _id: recipeId, userId: userId });

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found or not owned by the user" });
        }

        // Remove the recipe from the database
        await recipe.deleteOne();

        return res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;