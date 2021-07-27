
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/taskManagerApi',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true    
    })
    