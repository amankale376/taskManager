const express = require('express')
const router = new express.Router()
const Task = require('../models/task_model')
const auth = require('../middleware/auth')

router.post('/task', auth ,  async (req,res)=>{
  const newtask = new Task({
      ...req.body,
      owner:req.user._id
  })
    try{
     const task = await newtask.save()
     res.send(task)
    }catch(e){
        res.send(400).send(e)
    }
})
//Get /tasks?completed=false or completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try {
       // const task = await Task.findById(_id)
       const task = await Task.findOne({_id,owner:req.user._id})
       task? res.send(task) :res.status(404).send("No task found")
    } catch (error) { 
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth ,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedTaskUpdates = ['completed', 'description']
    const isValidUpdate = updates.every((update)=>allowedTaskUpdates.includes(update))
    !isValidUpdate? res.status(400).send('Not a valid field to update'):null
    try {
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
       
        !task?res.status(404).send("no task with that id"):res.send(task)
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        req.send(task)
    } catch (error) {
       res.status(500).send() 
    }
})

router.delete('/task/:id', auth , async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.user.id , owner:req.user._id})
        !task ? res.send(404).send() : null
        res.send(task)
     } catch (error) {
        res.status(500).send()
    }
})
module.exports = router