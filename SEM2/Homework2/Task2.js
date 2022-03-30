const express = require('express');

const app = express(); 

app.get('/:name', (req, res) => {
    // wysyłamy do klienta dane
    res.send(`hello ${req.params.name}`);
});

app.listen(4700);