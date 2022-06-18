
const auth = require('./authMiddleware');
const client = require('./mongoDBCliend').getDb;
const errorLog = require('./errorLog').logError;

async function addElementToCollection(collectionName, element) {
    try {
        const collection = client().collection(collectionName);
        const result = await collection.insertOne(element);
        if (!result) {
            throw '500 - Internal Server Error'
        }
        return result;
    } catch (error) {
        errorLog("Error while adding!\n " + error);
    }
}

async function deleteElementFromCollection(collectionName, elementId) {
    try {
        const collection = client().collection(collectionName);
        const element = collection.find(x => x.Id === elementId);
        if (!auth.isUserCanModify(element.CreatorId)) {
            throw '401 - unauthorized';
        }
        const result = await collection.deleteOne(element);
        return result;
    } catch (error) {
        errorLog("Error while delete element!\n " + error);
    }
}

async function updateElementInCollection(collectionName, element) {
    try {
        const collection = client().collection(collectionName);
        const options = { upsert: true };
        const element = collection.find(x => x.Id === elementId);
        if (!auth.isUserCanModify(element.CreatorId)) {
            throw '401 - unauthorized';
        }
        const result = await collection.updateOne(element, options);
        return result;
    } catch (error) {
        errorLog("Error while update!\n " + error);
    }
}
async function getAllElements(collectionName) {

    try {
        const collection = client().collection(collectionName);
        const result = await collection.find().toArray();
        return result;
    } catch (error) {
        errorLog("Error while getting all elements!\n " + error);
    }
}

async function getOneElement(collectionName, element) {
    try {
        const collection = client().collection(collectionName);
        const result = await collection.find({ isActive: true }).toArray();
        return result;
    } catch (error) {
        errorLog("Error while getting one element!\n " + error);
    }
}
module.exports = {
    add: addElementToCollection,
    delete: deleteElementFromCollection,
    update: updateElementInCollection,
    getAll: getAllElements,
    getOne: getOneElement
}