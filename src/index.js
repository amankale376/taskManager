const express = require('express')
require('./db/db')
const routerUser = require('./routers/users-router') 
const routerTask = require('./routers/tasks-router') 
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(routerTask)
app.use(routerUser)

app.listen(port,()=>{
  console.log('server is up on port '+port)  
})