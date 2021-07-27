 const mongoose = require('mongoose')
 const Validator = require('validator')

 const userSchema = new mongoose.Schema({
    name:{type:String , required:true, trim:true},
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
      type:String,
      required:true,
      trim:true,
      minLength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "Password"')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative')
            }
        }
    }

})

// userSchema.pre('save', async (next) =>{
// const user = this
// next()
// })

const User = mongoose.model('User', userSchema)
module.exports =User