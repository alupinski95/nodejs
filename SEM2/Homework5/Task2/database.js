require('dotenv').config();

const { MongoClient } = require('mongodb');

const taskCOllectionName = 'tasks';
let taskCollection;
let db;
const init = () =>{
    MongoClient.connect(process.env.MONGODB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((client)=>{

        db = client.db(process.env.MONGODB_DBNAME);
        taskCollection = db.collection(taskCOllectionName);
    })
    .catch(err=> console.log(err))
}

const getTasks = () =>{
    return taskCollection.find().toArray();
}

const getTask = (taskId) =>{
    return taskCollection.findOne({_id:taskId})
}
const deleteTask = (taskId) =>{
    return taskCollection.deleteOne({_id:taskId})
}

const addTask = (newTask) =>{
    
}
const updateTask = (task) =>{
    
}



module.exports={
    init,
    getTask,
    getTasks,
    addTask,
    deleteTask,
    updateTask
}