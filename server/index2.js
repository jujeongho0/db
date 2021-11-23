const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(require('./area'));
app.use(bodyparser.json);
app.use(errorHandler);

app.listen(3000);

function errorHandler(err, req, res, next){
    res.status(err.code).send({msg : err.message});
}


