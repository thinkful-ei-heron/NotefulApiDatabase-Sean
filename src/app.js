'use strict';

require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors =  require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const foldersRouter = require('./folders/foldersRouter');
const notesRouter = require('./notes/notesRouter')
const validateToken = require('./validateToken')

const app = express();

const morganOption = (NODE_ENV === 'production') ? 
    'tiny' : 
    'common' ;

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(validateToken)
app.use('/api/folders', foldersRouter)
app.use('/api/notes', notesRouter)

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!');
});

//Catch-all 404
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Catch-all Error Handler
//Add NODE_ENV check to prevent a stacktrace leak
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
