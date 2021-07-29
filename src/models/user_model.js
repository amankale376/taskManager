 const mongoose = require('mongoose')
 const Validator = require('validator')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const Task = require('./task_model')
 
 const userSchema = new mongoose.Schema({
    name:{type:String ,
         required:true, 
         trim:true},
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){
const user = this
const userObject = user.toObject()
delete userObject.password
delete userObject.tokens
return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'abcd')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
//checked user credentials 
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
//hashed password before saving 
userSchema.pre('save', async function (next){
const user = this  //this gives us a reference to individual document that is about to be saved
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8)
   }
    next()
})
//delete user tasks when user is deleted
userSchema.pre('remove',async function (next){
    const user = this
   await Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User', userSchema)
module.exports =User