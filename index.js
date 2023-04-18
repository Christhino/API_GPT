const express = require("express");

const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const SibAPIV3Sdk = require('sib-api-v3-sdk')
const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
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
const defaultClient  =  SibAPIV3Sdk.ApiClient.instance;

var apiKey  = defaultClient.authentications['api-key']
apiKey.apiKey = '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'


app.use(session({
  secret: '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',
  resave: true,
  saveUninitialized: true,
}));

const verificationCode = Math.floor(100000 + Math.random() * 900000);

app.post('/api/login' ,async(req,res) => {
  const apiInstance =  new  SibAPIV3Sdk.TransactionalEmailsApi();
  // const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const sender = {
    email: "mintsaniaina.christhino.pro@gmail.com",
    name:"Verbalia"
  };
  const receivers = [
    {
      email : req.body.email,
    },
  ];
  try {
    const sendEmail =  await   apiInstance.sendTransacEmail({
         sender,
         to : receivers,
         subject :  "Verify your email address",
         textContent : "Login  confirmation",
         htmlContent : `<p>Hi there!</p><p>Please use the following code to verify your email address: ${verificationCode}</p>`
    })
    return  res.send(sendEmail)
  }catch(error){
    return  res.send(error)
  }
  
})

app.post('/api/confirm', async (req, res) => {
  const userCode = req.body.code; // le code envoyé par l'utilisateur
  // vérifier si le code est valide
  if (userCode === verificationCode) {
    return res.send('Code is valid');
  } else {
    return res.status(400).send('Invalid code');
  }
});


app.post('/test', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "ada",
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