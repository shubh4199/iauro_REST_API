const express = require('express')
var bodyParser = require('body-parser')
const res = require('express/lib/response')
const { json } = require('body-parser')

const mongoose = require('mongoose')

const mongoDB = 'mongodb://localhost:27017/CustomName_api'
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});

const db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDB connections error:'));

const CustomSchema = new mongoose.Schema({
    id:Number,
    firstName:String,
    age:Number
})

const CustomName = mongoose.model('Customer',CustomSchema)

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


const port = 4567

const customers = [ 

    {
        id : 1,
        firstName: "John", 
        age: 27  
    }, 
  
    { 
        id : 2,
        firstName: "James", 
        age: 32 
    }, 
  
    { 
        id : 3,
        firstName: "Robert", 
        age: 45 
    } 
  
  ] 

app.get("/", async (req,res)=>{
    //await CustomName.deleteMany();
    //await CustomName.insertMany(customers);
    CustomName.find((err,customers)=>{

    console.log("CUSTOMERS",customers)
    res.json(customers)
    })
})

app.get("/customers/:id",(req,res)=>{
    CustomName.findById(req.params.id,(err,CustomName)=>{
    res.json(CustomName)
    })
})

app.post("/customers",(req,res)=>{
    const custom = new CustomName({
        id : req.body.id,
        firstName : req.body.firstName,
        age: req.body.age
    })
    custom.save((err)=>{
        res.json(custom)
    })
    res.json({message:"ok"})
})

app.put("/customers",(req,res)=>{
    CustomName.findByUpdate(req.params.id,req.body,(err)=>{
        res.json({message:'updated customers ${req.params.id}'})
    })
})

app.delete("/customers",(req,res)=>{
    CustomName.findByIdAndDelete(req.params.id,(err)=>{
        res.json({message:'deleting customers ${req.params.id}'})
    })
})

app.listen(port,()=>{
    console.log('Listening on port ${port}')
})
