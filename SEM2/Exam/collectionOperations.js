
const AdObject = require('./AdvertiseController/AdObject');
const auth = require('./authMiddleware');
const client = require('./mongoDBCliend').getDb;
const errorLog = require('./errorLog').logError;

function updateElement(basicElement, elementToUpdate) {
    basicElement.title = elementToUpdate.title ?? basicElement.title;
    basicElement.description = elementToUpdate.description ?? basicElement.description;
    basicElement.category = elementToUpdate.category ?? basicElement.category;
    basicElement.tagArray = elementToUpdate.tagArray ?? basicElement.tagArray;
    basicElement.price = elementToUpdate.price ?? basicElement.price;
}


async function addElementToCollection(collectionName, element) {
    try {
        const collection = client().collection(collectionName);
        const result = await collection.insertOne(element);
        if (!result) {
            throw '500 - Internal Server Error';
        }
        return result;
    } catch (error) {
        errorLog("Error while adding!\n " + error);
    }
}

async function deleteElementFromCollection(collectionName, elementId) {
    try {
        const collection = client().collection(collectionName);
        let element = await collection.find().toArray();
        element = element.find(x => x.toString().includes(elementId));

        if (!auth.isUserCanModify(element.CreatorId)) {
            throw '401 - unauthorized';
        }
        if (!element) {
            throw '404 - Element not found'
        }
        const result = await collection.deleteOne(element);
        return result;
    } catch (error) {
        errorLog("Error while delete element!\n " + error);
    }
}

async function updateElementInCollection(collectionName, elementToUpdate) {
    try {
        const collection = client().collection(collectionName);
        const options = { upsert: true };
        const element = collection.find(x => x._id === elementToUpdate.id);
        if (!auth.isUserCanModify(element.CreatorId)) {
            throw '401 - unauthorized';
        }
        if (!element) {
            throw '404 - Element not found'
        }
        updateElement(element, elementToUpdate);
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
        if (!result) {
            throw '404 - Element not found';
        }
        return result;
    } catch (error) {
        errorLog("Error while getting all elements!\n " + error);
    }
}

async function getOneElement(collectionName, elementId) {
    try {
        const collection = client().collection(collectionName);

        let result = await collection.find().toArray();
        result = result.find(x => x.toString().includes(elementId));

        if (!result) {
            throw '404 - Element not found';
        }
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