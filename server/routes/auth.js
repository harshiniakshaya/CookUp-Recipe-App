const express = require('express')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt'); //password encryption
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const router = express.Router()

router.post('/register', async (req,res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})
    if(user){
        return res.json({message: 'user existed'})
    }
    const hashpassword = await bcrypt.hash(password,10)
    const newuser = new UserModel({username,password:hashpassword})
    newuser.save()
    return res.json({message:"record saved"})
})

router.post('/login', async (req,res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message: 'wrong credentials'})
    }
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword){
        return res.json({message: 'wrong credentials'})
    }
    const token = jwt.sign({id:user._id},"secret")
    res.cookie("token",token)
    return res.json({message: "successfully logged in", id : user._id})

})

router.get('/logout', (req,res)=>{
    res.clearCookie("token")
    res.json({message:"Success"})
})

router.get('/find-username/:userId',async(req,res)=>{
    try{
        const id=req.params.userId;
        const user = await UserModel.findOne({_id:id})
        if (!user) {
            // If user not found, send 404 status with message
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(user.username)
        res.json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;