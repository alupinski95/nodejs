const express = require('express');
const bodyParser = require('body-parser');
const mongoDbCLient = require('./MongoDBCliend')
const postCollectionName = "Posts";

const router = express.Router(); 

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


const htmlHelper = (data) => {return `<div><p>${data.title}</p><span>${data.body}</span></div>`}

router.post('/add', async (req, res) => {
    let newPost = {title:req.body.title,body:req.body.body};
    // await mongoDbCLient.add(postCollectionName,newPost)
    res.status(201);
    res.send();

});

router.delete('/delete/:id', async (req, res) => {
    let postToRemove = {title:req.body.title,body:req.body.body};
    let onePost = await mongoDbCLient.getOne(postCollectionName,postToRemove)
    if(onePost){
        mongoDbCLient.delete(postCollectionName,{ id: onePost[0]._id})
    }
    setFormatRes(res,req);
    res.status(204);
    res.send();
});

router.get('/show/:id', async (req, res) => {
    let data = null;
    if (req.params.id) {
        data = postList[req.params.id-1];
    }
    setFormatRes(res,req);
    res.status(200);
    setFormatRes(res,[data]);
});

router.get('/show', async (req, res) => {
    let posts = await mongoDbCLient.getAll(postCollectionName);
    res.status(200);
    res.send(posts)
    // setFormatRes(res,posts);
});


function setFormatRes(res,data){
    res.format({
        html: function () {
            let html = "";
            data.forEach(element =>{
                html+= htmlHelper(element)
            });
            res.send(`<div>${html}</div>`);
          },
        text: function () {
            res.send(JSON.stringify(data));
        },      
        json: function () {
            res.send(JSON.parse(JSON.stringify(data)));
        }
    })
}
module.exports = router;