const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/users', async (req, res)=>{
    try{
    const users = await User.find({})
    res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try{
      const user = await User.findById(_id)
      user?res.send(user):res.status(404).send()
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users', async (req,res)=>{
const user = new User(req.body)
try{
    await user.save()
}catch(e){
       res.status(400).send(e)
}    
})


router.delete('/users/:id', async (req,res)=>{
    try {        
        const user = await User.findByIdAndDelete(req.params.id)
        !user?res.status(404).send("no user with that id"):res.send(user)
    } catch (error) {
       res.status(500).send() 
    }
})
router.patch('/users/:id', async (req,res)=>{
    const updates =Object.keys(req.body)
    const allowedUpdates = ['name', 'email','passoword','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    !isValidOperation? res.status(400).send('Not a valid field to update'):null
  
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
        user?res.send(user):res.status(404).send()
    } catch (error) {
        res.status(400).send(error)
    }
})





module.exports = router