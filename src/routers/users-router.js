const express = require('express')
const router = new express.Router()
const User = require('../models/user_model')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){   //using regular expressions here
            return cb(new Error('Avatar must be an Image'))
        }
        cb(undefined,true)
    }

})
router.get('/users', auth ,async (req, res)=>{
    res.send(req.user)
})

router.post('/users/logout', auth, async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.post('/users/logoutAll',auth, async(req, res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.staus(500).send()
    }
})
router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
res.send()
})

router.post('/users', async (req,res)=>{
const user = new User(req.body)
try{
   const savedUser = await user.save()
   const token = await user.generateAuthToken()
    res.send({savedUser , token})
}catch(e){
       res.status(400).send(e)
}    
})

router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth ,  async (req,res)=>{
    try {        
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
       res.status(500).send() 
    }
})

router.patch('/users/me', auth , async (req,res)=>{
    const updates =Object.keys(req.body)
    const allowedUpdates = ['name', 'email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    !isValidOperation? res.status(400).send('Not a valid field to update'):null
  
    try {
       
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
      res.send(req.user)
      
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router