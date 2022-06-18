const express = require('express');
const bodyParser = require('body-parser');
const collectionOperations = require('../collectionOperations');
const AdObject = require('./AdObject');
const collectionName = "AdvCollection";
const { authMiddleware } = require("../authMiddleware");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.use(authMiddleware);

function sendResponseByResult(result, res) {
    if (result) {
        res.status(201);
        res.send(result);
    }
    else {
        res.status(500);
        res.send('Internal Server Error');
    }
}

router.post('/add', async (req, res) => {

    let newAdv = new AdObject(
        req.body.title,
        req.body.description,
        req.body.author,
        req.body.category,
        req.body.tagArray,
        req.body.price,
        (new Date()).toLocaleDateString()
    );
    var result = await collectionOperations.add(collectionName, newAdv);

    res.status(200);
    res.send(result);
    //sendResponseByResult(addRes, res);
});

// router.delete('/delete/:id', async (req, res) => {
//     let postToRemove = { title: req.body.title, body: req.body.body };
//     let onePost = await mongoDbCLient.getOne(postCollectionName, postToRemove)
//     if (onePost) {
//         mongoDbCLient.delete(postCollectionName, { id: onePost[0]._id })
//     }
//     setFormatRes(res, req);
//     res.status(204);
//     res.send();
// });

// router.get('/show/:id', async (req, res) => {
//     let data = null;
//     if (req.params.id) {
//         data = postList[req.params.id - 1];
//     }
//     setFormatRes(res, req);
//     res.status(200);
//     setFormatRes(res, [data]);
// });

// router.get('/show', async (req, res) => {
//     let posts = await mongoDbCLient.getAll(postCollectionName);
//     res.status(200);
//     res.send(posts)
//     // setFormatRes(res,posts);
// });


// function setFormatRes(res, data) {
//     res.format({
//         html: function () {
//             let html = "";
//             data.forEach(element => {
//                 html += htmlHelper(element)
//             });
//             res.send(`<div>${html}</div>`);
//         },
//         text: function () {
//             res.send(JSON.stringify(data));
//         },
//         json: function () {
//             res.send(JSON.parse(JSON.stringify(data)));
//         }
//     })
// }
module.exports = router;