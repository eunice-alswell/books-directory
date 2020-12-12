const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        require:[true,'email is required'],
        lowercase:true
    },
    Surname:{
        type:String,
        require:[true,'email is required'],
        lowercase:true
    },
    username:{
        type:String,
        require:[true,'email is required'],
        unique: true,
        lowercase:true
    },
    email:{
        type:String,
        require:[true,'email is required'],
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        require:[true,'email is required'],
        lowercase:true

    },
    role:{
        type:String,
        enum:['admin']
    }
    
})

module.exports = userSchema