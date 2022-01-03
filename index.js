#!/usr/bin/env nodejs

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');

//Load Environment Variables
require('dotenv').config();
//Connect to DataBase
require('./database/db');

// set security HTTP headers
app.use(helmet());

//gzip compression
app.use(compression());

//Cross origin fix
app.use(cors());

//Parses requests body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

//Initialise Passport
app.use(passport.initialize());

//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method == "OPTIONS")
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }

    next();
})

//include route module
const publicRoute = require('./routes/public');
const AuthRoute = require('./routes/auth');

//App Routes
//app.use('/', homeRoute);
app.use('/api/v1/', publicRoute );
app.use('/api/v1/auth/', AuthRoute);

//Landing Page
app.use('/test-page', function(req, res, next){
    res.send("if you are here, there you are lucky!!!");
});

app.use((req, res, next) => {
    const error = new Error("Route for resource is not found");
    error.status = 404;
    next(error);
});

//Error handling
app.use( (error, req, res, next) => {

    //return next(new Error("Something is wrong"))
    return res.status(error.status || 500).send({
        error: {
            status: 'ERROR',
            message: error.message || 'Internal Server Error'
        }
    })
});

const PORT = process.env.PORT || 3014;

app.listen(PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port: '+PORT);
    }
});
