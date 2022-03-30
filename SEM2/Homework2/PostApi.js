const express = require('express');
const bodyParser = require('body-parser');
let postList = [];

const router = express.Router(); 

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


const htmlHelper = (data) => {return `<div><p>${data.title}</p><span>${data.body}</span></div>`}

router.post('/add', (req, res) => {
    let index = postList.length + 1;
    let newPost = {index:index, title:req.body.title,body:req.body.body};
    postList.push(newPost);
    res.status(201);
    res.send();

});

router.delete('/delete/:id', (req, res) => {
    postList.splice(req.params.id-1, 1);
    setFormatRes(res,req);
    res.status(204);
    res.send();
});

router.get('/show/:id', (req, res) => {
    let data = null;
    if (req.params.id) {
        data = postList[req.params.id-1];
    }
    setFormatRes(res,req);
    res.status(200);
    setFormatRes(res,[data]);
});

router.get('/show', (req, res) => {
    res.status(200);
    setFormatRes(res,postList);
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