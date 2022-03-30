const express = require('express');

const app = express(); 

app.get('/mnozenie/:a/:b', (req, res) => {
    // wysyłamy do klienta dane
    let resultA = Number(req.params.a);
    let resultB = Number(req.params.b);
    let multip = resultA*resultB;
    res.send(multip.toString());
});

app.get('/odejmowanie/:a/:b', (req, res) => {
    // wysyłamy do klienta dane
    let resultA = Number(req.params.a);
    let resultB = Number(req.params.b);
    let multip = resultA-resultB;
    res.send(multip.toString());
});

app.get('/dodawanie/:a/:b', (req, res) => {
    // wysyłamy do klienta dane
    let resultA = Number(req.params.a);
    let resultB = Number(req.params.b);
    let multip = resultA+resultB;
    res.send(multip.toString());
});

app.get('/dzielenie/:a/:b', (req, res) => {
    // wysyłamy do klienta dane
    let resultA = Number(req.params.a);
    let resultB = Number(req.params.b);
    let multip = resultA/resultB;
    res.send(multip.toString());
});


app.listen(4700);