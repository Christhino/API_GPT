const express = require("express");

const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();




const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

const app = express();
app.use(express.json());

app.use(cors({ origin: "*"}));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static("./public"))

// PUBLIC ROUTE 

app.use('/api/posts', require('./src/routes/post.route'))

app.use('/api/responses', require('./src/routes/response.route'))

// PRIVATE ROUTE 
 

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(process.env.DATABASE_URL);
    console.log(`app started at http://localhost:${process.env.PORT}`)
})