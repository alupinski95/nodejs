require('dotenv').config();
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true});

const taskCOllectionName = 'tasks';
client.connect(async err=>{
    if(err){
        console.log(err);
        return;
    }


    app.get('/tasks',async (req,res)=>{
        const taskColection = client.db(process.env.MONGODB_DBNAME)
            .collection(taskCOllectionName);
        const tasks = await taskColection.find().toArray();
        res.send(tasks);
    })
})

app.get('/heartbeat',(req,res)=>{
    res.send(new Date());
})




app.listen(process.env.PORT,() => console.log('Server Started'));