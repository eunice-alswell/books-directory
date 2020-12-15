const Book = require('../models/bookModel')
const jwt = require('jsonwebtoken')

const Author = require("../models/authorModel")

const bookCtrl ={}

const getTokenFrom = req =>{
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }

    return null
}

bookCtrl.addBook = async(req,res) =>{
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token,process.env.SECRET)

    if(!token || decodedToken.id){
        return res.status(401).json({error:"token missing or invalid token"})
    }

    const user = await Author.findById(decodedToken.id)

    
    if (req.body.role === 'admin'){
        const newbook = new Book(body)
        const result = await newbook.save()

        res.status(200).send({message:'book is succesfully added',result})
    }
    else{
        res.status(400).send({message:'you can add book'})
    }

}

bookCtrl.getbook = async(req,res)=>{
    try {
        let book = await Book.find({})
        res.status(200).send({message:"book found",book})   
    } catch (error) {
        console.log(error)
    }

}
bookCtrl.getbookById = async(req,res)=>{
    try {
        let book = await Book.findById({_id:req.params.id})
        if(book){
            res.status(200).send({message:"book found",book})
        }
        else{
            res.status(400).send({message:'no such book with that ID'})
        }
        
    } catch (error) {
        console.log(error)
    }

}

bookCtrl.deletebook = async(req,res)=>{
    try {
        if (req.body.role === 'admin'){
            let book = await Book.findByIdAndRemove({_id:req.params.id})
            res.status(200).send({message:"book has been deleted",book})
        }
    }catch(error){
        console.log(error)
    }

}

module.exports = bookCtrl