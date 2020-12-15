const Author = require ('../models/authorModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const handleError= (error) => {
    let err = {name : '', email : '', password : ''}
    if(error.message === 'incorrect name'){
        err.name = 'that name does not exit'
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

const authorCtrl = {}

//  create a User = POST method
authorCtrl.createAuthor = async(req,res) =>{
    const body = req.body
    const salt = 10
    body.password = await bcrypt.hash(body.password,salt)
    const newUser = new Author(body)
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
authorCtrl.loginauthor= async(req,res) =>{
    const body = req.body

    const user = await Author.findOne({ name: body.name })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.password)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      name: user.name,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    res
      .status(200)
      .send({ token, name: user.name, id: user._id })
    
}

authorCtrl.getAuthorById = async(req,res)=>{
    try{
        let user = await Author.findById({_id:req.body._id})
        if(!user){
            res.status(400).send({message: 'User does not exit'})
        }
        else{
            res.status(200).send ({message: ' This user exit, hurayy',user})
        }

    }catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}
authorCtrl.getAuthorByBook = async(req,res)=>{
    try{
        let user = await Author.findById({book:req.body.book})
        if(!user){
            res.status(400).send({message: 'book does not exit'})
        }
        else{
            res.status(200).send ({message: ' This book exit, hurayy',user})
        }

    }catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}




//update a user detail = UPDATE/PUT method

authorCtrl.UpdateAuthor = async (req,res) =>{

    const {name,email,password,role,book} = req.body

    try{
       if({role} === 'admin'){
        let user = await Author.findOneAndupdate({_id: req.params.id},{name,email,password,role,book})
        if(user){
            res.status(200).send({message:'User updated successfully', user})
        }else{
            res.status(400).send({message:'Could not update user'})
        }
       }else{
           console.log(error)
       }
    }
    catch(error){
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

authorCtrl.deleteAuthor = async(req,res)=>{
    try {
        if (req.body.role === 'admin'){
            let user = await Author.findByIdAndRemove({_id:req.params.id})
            if(user){
                res.status(200).send({message:'User updated successfully', user})
            }else{
                res.status(400).send({message:'Could not update user'})
            }
        }
    }catch(error){
        console.log(error)
    }

}


module.exports =authorCtrl

