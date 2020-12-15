const mongoose = require('mongoose');
const  bcrypt = require('bcrypt') 

const authorSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength: [5, 'minimum username length is 5' ],
        maxlength: [16, 'maximum username length is 16'],
        unique: true,
        required :[ true,'Please enter a username'],
        lowercase : true
    },
    email: {
        type:String,
        unique: true, 
        required: [true, 'the email field is required'],
        lowercase:true
    },
    password: {
        type:String, 
        minlength: 6,
        required : [true, 'you must enter a password']
    },
    role:{
        type:String,
        Enumerator:['admin']
    },
    book:{
        type:Array,
        required:[true,'please author should have a book'],
        lowercase:true
    }
})


const Author = mongoose.model('author',authorSchema)

authorSchema.pre('save', async function(next){
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password,salt)
        console.log(this.password)
    next()
})

module.exports = Author