
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://alupinski:${process.env.passwordMongoDb}@cluster0.dmrsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function addElementToCollection(collectionName,element){
    try{
        client.connect(async err => {
            const collection = client.db(process.env.databaseName).collection(collectionName);
            const result = await collection.insertOne(element);
            console.log(result);
        });
    }catch(error){
        console.log("Error while adding!");
    }
    finally{
        client.close();
    }
      
}

async function deleteElementFromCollection(collectionName,element){
    try{
    client.connect(async err => {
        const collection = client.db(process.env.databaseName).collection(collectionName);
        const result = await collection.deleteOne(element);
        console.log(result);
      });
    }catch(error){
        console.log("Error while delete element!");
    }
    finally{
        client.close();
    }
}

async function updateElementInCollection(collectionName,element){
    try{
        client.connect(async err => {
            const collection = client.db(process.env.databaseName).collection(collectionName);
            const options = { upsert: true };
            const result = await collection.updateOne(element,options);
            console.log(result);
        });
    }catch(error){
        console.log("Error while update!");
    }
    finally{
        client.close();
    }
}
async function getAllElements(collectionName){
    
    try{
        client.connect(async err => {
            const collection = client.db(process.env.databaseName).collection(collectionName);
            const result = await collection.find().toArray();
            console.log(result);
            return result;

          });

    }catch(error){
        console.log("Error while getting all elements!");
    }
    finally{
        client.close();
    }
}

async function getOneElement(collectionName,element){
    try
    {
        const collection = client.db(process.env.databaseName).collection(collectionName);
        const result = await collection.find({ isActive: true }).toArray();
        return result;
    }catch(error){
        console.log("Error while getting one element!");
    }
    finally{
        client.close();
    }
}
module.exports = {
    add:addElementToCollection,
    delete:deleteElementFromCollection,
    update:updateElementInCollection,
    getAll:getAllElements,
    getOne:getOneElement
}