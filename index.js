'use strict';

const express = require('express');
const app = express();

//Environment Variable
const env = require('dotenv');
const bodyParser = require('body-parser');
env.config();

//Routes


app.use(bodyParser());
app.get('/',(req, res, next)=>{
    res.json({
        message: "Welcome to Server"
    })
});


app.listen(process.env.PORT);
