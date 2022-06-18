require("dotenv").config();

const { MongoClient } = require("mongodb");
const errorLog = require("./errorLog").logError;


let databaseCollections = [];
let db;

const init = () =>
    MongoClient.connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((client) => {
            db = client.db(process.env.MONGODB_DBNAME);
        })
        .catch((err) => errorLog(err));

const getCollectionByName = (collectionName) => {
    if (!databaseCollections[collectionName]) {
        try {
            databaseCollections[collectionName] = db.collection(collectionName);
        } catch (error) { }
    }
    return databaseCollections[collectionName];
};
function getDb() {
    return db;
}
module.exports = {
    init,
    getCollectionByName,
    getDb,
};
