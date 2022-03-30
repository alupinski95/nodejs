// const express = require('express');

// let postList = [];

// const router = express.Router(); 



// router.post('/add/:title/:body', (req, res) => {
//     let index = postList.length + 1;
//     let newPost = {index:index, title:req.body.title,body:req.body.body}
//     postList.push(newPost);
//     res.status(201);
//     res.send();
// });

// router.delete('/delete/:id', (req, res) => {
//     postList.splice(req.params.id-1, 1);
//     res.status(204);
//     res.send();
// });

// router.get('/show/:id', (req, res) => {
//     let data = null;
//     if (req.params.id) {
//         data = postList[req.params.id-1];
//     }
//     res.status(200);
//     res.send(data);
// });

// router.get('/show', (req, res) => {
//     res.status(200);
//     res.send(postList);
// });

// module.exports = router;