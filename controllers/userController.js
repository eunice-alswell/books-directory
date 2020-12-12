const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const handleError= (error) => {
    let err = {username : '', email : '', password : ''}

    if(error.message === 'incorrect username'){
        err.username = 'that username does not exit'
    }

    if (error.message === 'incorrect email'){
        err.email = 'that email is not valid'
    }

    if (error.message === 'incorrect password'){
        err.password = 'the password is incorrect'
    }

    if (error.code === '11000'){
        err.email   = 'that email is registered already'
    }
    
    if (error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }


    return err
}



const userCtrl = {}

//creating user(signup) using post method
userCtrl.createUser = async(req,res)=>{
    try{
        let user = new user(res.body)
        let result = await user.save()
        res.status(201).send({message: 'user is successfully created',result})
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

//logining user in
userCtrl.loginUser = async(req,res)=>{
    const body = req.body
    try{
        
        let  user = await User.findOne({username:body.username})
        let correctpassword = user === null? false
        :await bcrypt.compare(body.password,user.correctpassword)
        
        res.status(201).send({message: 'user is successfully created',result})
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// updating user details using the update method

userCtrl.updateUser = async (req,res) =>{

    const {fullname,email,password} = req.body

    try{
       let user = await User.findOneAndupdate({_id: req.params.id},{fullname,email,password})
        res.status(200).send({message: 'updated successfully',user})
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

module.exports = userCtrl