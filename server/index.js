const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const recipeRouter = require('./routes/reciper')


const app = express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth',userRouter)
app.use('/recipe',recipeRouter)

mongoose.connect('mongodb://127.0.0.1:27017/RecipeApp-MERN');


app.listen(3001,()=>{
    console.log("server is running!");
})

