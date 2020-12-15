const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Please title is required"],
        unique:true
    },
    author:{
        type:String,
        required:[true, "Author is required"],
    },
    nunber_of_pages : {
        type: Number,
        required:[true,"add number of pages"]
    },
    category:{
        type : String,
        required:[true,"what category does the book fall in"]
    },
    rating:{
        type: Number,
        default:0
    }

})

const Book = mongoose.model('book',bookSchema)

module.exports = Book