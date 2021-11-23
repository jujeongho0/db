const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./area'));
app.use(errorHandler);

app.listen(3000);

function errorHandler(err, req, res, next){
    res.status(err.code).send({msg : err.message});
}


