const express = require('express')
require('./db/db')
const routerUser = require('./routers/users-router') 
const routerTask = require('./routers/tasks-router') 
const Task = require('./models/task_model')
const User = require('./models/user_model')
const app = express()
const port = process.env.PORT || 3000

// const multer = require('multer')
// const upload = multer({
//   dest:'images'
// })
// app.post('/upload',upload.single('upload'),(req,res)=>{
//   res.send()
// })
app.use(express.json())
app.use(routerTask)
app.use(routerUser)

app.listen(port,()=>{
  console.log('server is up on port '+port)  
})

