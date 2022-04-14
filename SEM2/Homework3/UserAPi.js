const express = require('express');
const router = express.Router(); 
let userList = [];
const User = require('../shared/UserClass')

const htmlHelper = (user) => {
    return `<div>
        <p>${user.name}</p>
        <p>${user.username}</p>
        <p>${user.email}</p>
    </div>`;
};


router.post('/add/:name/:username/:email', (req, res) => {
    let index = userList.length + 1;
    let newUser = new User(index, req.params.name, req.params.username, req.params.email);
    userList.push(newUser);
    res.status(201);
    res.send();
});

router.delete('/delete/:id', (req, res) => {
    userList.splice(req.params.id+1, 1);
    res.status(204);
    res.send();
});

router.get('/show/:id', (req, res) => {
    let data = null;
    if (req.params.id) {
        data = userList[req.params.id+1];
    }
    res.status(200);
    setFormatRes(res,[data])
});

router.get('/show', (req, res) => {
    res.status(200);
    setFormatRes(res,userList);
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