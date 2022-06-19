const express = require('express');
const bodyParser = require('body-parser');
const collectionOperations = require('../collectionOperations');
const AdObject = require('./AdObject');
const collectionName = "AdvCollection";
const { authMiddleware, getAuthUserId } = require("../authMiddleware");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.use(authMiddleware);

// function sendResponseByResult(result, res) {
//     if (result) {
//         res.status(201);
//         res.send(result);
//     }
//     else {
//         res.status(500);
//         res.send('Internal Server Error');
//     }
// }

function checkIdParams(req, res) {
    if (!req.params.id) {
        res.status(500);
        res.send('Internal Server Error');
    }
    return req.params.id;
}

router.post('/add', async (req, res) => {
    let newAdv = new AdObject(
        req.body.title,
        req.body.description,
        getAuthUserId(),
        req.body.category,
        req.body.tagArray,
        req.body.price,
        (new Date()).toLocaleDateString()
    );
    var result = await collectionOperations.add(collectionName, newAdv);

    res.status(201);
    res.send(result);
    //sendResponseByResult(addRes, res);
});

router.delete('/delete/:id', async (req, res) => {
    let idToRemove = checkIdParams(req, res);

    var result = await collectionOperations.delete(collectionName, idToRemove);

    res.status(200);
    res.send(result);
});

router.get('/get?:id', async (req, res) => {
    let idToRemove = checkIdParams(req, res);

    var result = await collectionOperations.getOne(collectionName, idToRemove);

    res.status(200);
    res.send(result);
});

router.get('/get', async (req, res) => {
    let posts = await collectionOperations.getAll(collectionName);
    res.status(200);
    res.send(posts);
});

router.patch('/update', async (req, res) => {
    let postToUpdate = new AdObject(
        req.body.title,
        req.body.description,
        getAuthUserId(),
        req.body.category,
        req.body.tagArray,
        req.body.price,
        (new Date()).toLocaleDateString()
    );
    var result = await collectionOperations.update(collectionName, postToUpdate);

    res.status(201);
    res.send(result);
});

module.exports = router;