

const AdObject = require('./AdvertiseController/AdObject');
const auth = require('./authMiddleware');
const client = require('./mongoDBCliend').getDb;
const errorLog = require('./errorLog').logError;

var respObj = {
    statusCode:0,
    message:"",
}
function getResponseError(){
    return respObj;
}
function setResponseError(code,msg){
    respObj.statusCode=code;
    respObj.message=msg;
}

function catchError(error){
    setResponseError(500,error);
    errorLog(error);
}
function checkResult(result,msg,code){
    if (!result) {
        setResponseError(code,msg)    
        throw `${code} - ${msg}`;
    }
}
async function addElementToCollection(collectionName, element) {
    try {
        const collection = client().collection(collectionName);
        const result = await collection.insertOne(element);

        checkResult(result,500,'Internal Server Error')
        
        return result;
    } catch (error) {
        catchError("Error while adding!\n " + error);
    }
}

async function deleteElementFromCollection(collectionName, elementId) {
    try {
        const collection = client().collection(collectionName);
        let element = await collection.find().toArray();
        element = element.find(x => x._id.toString().includes(elementId));

        if (!auth.isUserCanModify(element.author)) {
            checkResult(null,401,'unauthorized');
            
        }
        if (!element) {
            checkResult(null,404,'Element not found');
        }
        const result = await collection.deleteOne(element);
        checkResult(result,500,'Internal Server Error')
        return result;
    } catch (error) {
        catchError("Error while delete element!\n " + error);
    }
}

async function updateElementInCollection(collectionName, elementToUpdate,elementId) {
    try {
        const collection = client().collection(collectionName);
        const options = { upsert: true };
        let element = await collection.find().toArray();
        element = element.find(x => x._id.toString().includes(elementId));
        if (!element) {
            checkResult(null,404,'Element not found');
        }
        if (!auth.isUserCanModify(element.author)) {
            checkResult(null,401,'unauthorized'); 
        }
        
        const result = await collection.updateOne({_id:element._id}, { $set:elementToUpdate}, options);
        return result;
    } catch (error) {
        catchError("Error while update!\n " + error);
    }
}
async function getAllElements(collectionName) {
    try {
        const collection = client().collection(collectionName);
        const result = await collection.find().toArray();
        checkResult(result,404,'Element not found');
        return result;
    } catch (error) {
        catchError("Error while getting all elements!\n " + error);
    }
}

async function getOneElement(collectionName, elementId) {
    try {
        const collection = client().collection(collectionName);
        
        let result = await collection.find().toArray();
        result = result.find(x => x._id.toString().includes(elementId));

        checkResult(result,404,'Element not found');
        return result;
    } catch (error) {
        catchError("Error while getting one element!\n " + error);
    }
}
module.exports = {
    add: addElementToCollection,
    delete: deleteElementFromCollection,
    update: updateElementInCollection,
    getAll: getAllElements,
    getOne: getOneElement,
    getResponseError:getResponseError
}