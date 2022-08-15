const mongoose = require('mongoose'); 
//odm to interact with mongo db

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true
    }
)
module.exports= mongoose.model('User',userSchema)