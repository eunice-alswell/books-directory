const User = require ('../models/userModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const handleError= (error) => {
    let err = {firstname : '',lastname:'',username : '', email : '', password : ''}

    if(error.message === 'incorrect firstname'){
        err.firstname = 'that firstname does not exit'
    }
    if(error.message === 'incorrect lastname'){
        err.lastname = 'that lastname does not exit'
    }
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

//  create a User = POST method
userCtrl.createUser = async(req,res) =>{
    const body = req.body
    const salt = 10
    body.password = await bcrypt.hash(body.password,salt)
    const newUser = new User(body)
    const result = await newUser.save()

    res.status(200).send({message: 'Your account has been created',result})
    // try{
    //     req.body.password = bcrypt.hash(req.body.password, 10)
    //     let newUser  = new User(req.body)
    //     let result = await newUser.save()
    //     res.status(200).send({message: 'Your account has been created',result})
    // } catch(error) {
    //     const warnings = handleError(error)
    //     res.status(400).json({warnings})
    // }
}

// logging user in
userCtrl.loginUser = async(req,res) =>{
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.password)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
    
} 




//update a user detail = UPDATE/PUT method

userCtrl.UpdateUser = async (req,res) =>{

    const {username,email,password} = req.body

    try{
       let user = await User.findOneAndupdate({_id: req.params.id},{username,email,password})
        res.status(200).send({message: 'updated successfully',user})
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}


module.exports =userCtrl

