const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const recipeRouter = require('./routes/reciper')
const multer = require('multer')

const app = express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth',userRouter)
app.use('/recipe',recipeRouter)

mongoose.connect('mongodb://127.0.0.1:27017/RecipeApp-MERN');

// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'public/images')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage:storage
// })

// app.post('/upload',upload.single('file'),(req,res)=>{
//     console.log(req.file)
// })

app.listen(3001,()=>{
    console.log("server is running!");
})

