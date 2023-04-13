const express = require("express");

const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 


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

app.use('/api/motivation', require('./src/routes/motivation.route'))

app.use('/api/contenu',  require('./src/routes/contenu.route'))

app.use('/api/article', require('./src/routes/article.route'))

app.use('/api/paragraphe',  require('./src/routes/paragraphe.route'))

app.use('/api/annonces',  require('./src/routes/annonces.route'))
// PRIVATE ROUTE 

app.post('/test', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });
    const message = response.data.choices[0].text;
    res.send({ message });
  });
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