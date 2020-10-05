const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

const uri = `mongodb+srv://MainulSakib:MainulSakib@cluster0.nl52z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  
   const volunteer= client.db("volunteer-network").collection("volunteer");
   app.post('/addVolunteers',(req, res) => {
     const activity=req.body;
     volunteer.insertOne(activity) 
     .then(result=>{
       res.send(result.insertedCount>0)
       res.redirect('/')
     })
    })
    app.get('/ManyVolunteers',(req, res) => {
      volunteer.find({})
      .toArray((err,documents)=>{
         console.log(documents)
        res.send(documents)
      })
    })
    app.get('/volunteer',(req, res) => {
      volunteer.find({email:req.query.email})
      .toArray((err,documents)=>{
         console.log(documents)
        res.send(documents)
      })
    })
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })   
    app.delete('/delete/:id',(req, res)=>{
      volunteer.deleteOne({_id:ObjectId(req.params.id)})
      .then(result=>{
        console.log(result)
      })
    })

});

app.listen(process.env.PORT||port)