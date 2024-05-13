const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    image:{
        type: Object,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
})

const RecipeModel = mongoose.model("recipes", RecipeSchema)
module.exports = RecipeModel;