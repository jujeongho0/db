const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); //바디 파서 설정을 라우터보다 먼저

app.use('/covid',require('./routes/covidRouter'));
app.use('/user',require('./routes/userRouter'));
app.use('/developer',require('./routes/developerRouter'));

app.use(errorHandler);
app.listen(3000);

function errorHandler(err, req, res, next){
    res.status(err.code).send({msg : err.message});
};
