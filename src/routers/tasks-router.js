const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/task', async (req,res)=>{
    const task = new Task(req.body)
    try{
     const task = await task.save()
     res.send(task)
    }catch(e){
        res.send(400).send(e)
    }
})

router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        task? res.send(task) :res.status(404).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedTaskUpdates = ['completed', 'description']
    const isValidUpdate = updates.every((update)=>allowedTaskUpdates.includes(update))
    !isValidUpdate? res.status(400).send('Not a valid field to update'):null
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        task?res.send(task):res.status(404).send()    
        } catch (error) {
            res.status(400).send(error)
         }
})

router.delete('/tasks/:id', async (req,res)=>{
    try {        
        const task = await Task.findByIdAndDelete(req.params.id)
        !task?res.status(404).send("no task with that id"):res.send(task)
    } catch (error) {
       res.status(500).send() 
    }
})

module.exports = router