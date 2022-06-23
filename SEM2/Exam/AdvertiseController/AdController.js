const express = require('express');
const bodyParser = require('body-parser');
const collectionOperations = require('../collectionOperations');
const AdObject = require('./AdObject');
const collectionName = "AdvCollection";
const { authMiddleware, getAuthUserId } = require("../authMiddleware");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());


function sendResponseByResult(result, res) {
    if (result) {
        res.status(201);
        res.send(result);
    }
    else {
        const status = collectionOperations.getResponseError();
        res.status(status.statusCode);
        res.send(status.message);
    }
}

function checkIdParams(req, res) {
    if (!req.query.id) {
        res.status(500);
        res.send('Internal Server Error');
    }
    return req.query.id;
}
router.get('/getAll', async (req, res) => {
    let result = await collectionOperations.getAll(collectionName);
    sendResponseByResult(result, res);
});
router.get('/get?:id', async (req, res) => {
    let idToRemove = checkIdParams(req, res);

    let result = await collectionOperations.getOne(collectionName, idToRemove);
    sendResponseByResult(result, res);

});



router.use(authMiddleware);

router.post('/add', async (req, res) => {
    if(!req.body.title || !req.body.description){
            res.status(400);
            res.send('Title and Description are required');
        }
    let newAdv = new AdObject(
        req.body.title,
        req.body.description,
        getAuthUserId(),
        req.body.category,
        req.body.tagArray,
        req.body.price,
        (new Date()).toLocaleDateString()
    );
    let result = await collectionOperations.add(collectionName, newAdv);

    sendResponseByResult(result, res);
});

router.delete('/delete?:id', async (req, res) => {
    let idToRemove = checkIdParams(req, res);

    let result = await collectionOperations.delete(collectionName, idToRemove);

    sendResponseByResult(result, res);
});



router.patch('/update?:id', async (req, res) => {
    let idToRemove = checkIdParams(req, res);
    let postToUpdate = new AdObject(
        req.body.title,
        req.body.description,
        getAuthUserId(),
        req.body.category,
        req.body.tagArray,
        req.body.price,
        (new Date()).toLocaleDateString()
    );
    let result = await collectionOperations.update(collectionName, postToUpdate,idToRemove);

    sendResponseByResult(result, res);
});

module.exports = router;