const path = require("path")
const express = require("express")
const request = require('request');
const axios = require('axios');
const bodyParser = require("body-parser")

const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai")
// const { API_KEY } = require("./config")
// // const config = new Configuration({
// //     apiKey: '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'
// // });

const API_KEY = "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"


const configuration = new Configuration({
    apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)


const app = express()
const port = 5000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('tes')
})

app.post("/chat", async (req, res) => {
	
	try {
		const prompt = req.body.prompt
		const url = `https://api.mymemory.translated.net/get?q=${prompt}&langpair=mg|fr`;
		const prompt_translate = await axios.get(url);
		const translation = prompt_translate.data.responseData.translatedText;
		
		// function  translateText(sourceLang, targetLang, callback){
		// 	const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(prompt) +
		// 	'&langpair=' + encodeURIComponent(sourceLang + '|' + targetLang) +
		// 	'&key=' + encodeURIComponent('93100eebb0a43622fe32');

		// 	request.get(url, (error, response, body) => {
		// 		if (error) {
		// 			return callback(error);
		// 		}
		
		// 		if (response.statusCode !== 200) {
		// 			return callback(new Error('La requête a échoué avec le code d\'erreur ' + response.statusCode));
		// 		}
		
		// 		const result = JSON.parse(body);
		// 		callback(null, result.responseData.translatedText);
		// 	});
		// }
		
     
		// translateText(prompt, 'mg', 'fr', (err, translation) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return;
		// 	}
		
		// 	console.log(translation);
		// });

        // const { message ,  Model  } = req.body
		const response = await openai.createCompletion({
			model: "text-davinci-003",
            // model:`${message}`,
			// prompt: `Remove html tags and Extract keywords from this text:${prompt}`,
			prompt: "Exprime toi amicalement et utilise des emojis.  propose directement une solution et des directives techniques qu'importe le type de question en repondant a ce:" + translation,
			temperature: 1,
			max_tokens: 250,
			top_p: 1.0,
			frequency_penalty: 0.8,
			presence_penalty: 0.0,
		})
        
		let data = response.data.choices[0].text

		

		res.send(data)

	} catch (error) {
		console.log("Error:", error)
	}
})

// translate 
app.get('/translate', async (req, res) => {
	// const { text, source, target } = req.query;
	const {prompt}=req.query;

	const url = `https://api.mymemory.translated.net/get?q=salama leka Rakoto&langpair=mg|fr`;
	try {
	  const response = await axios.get(url);
	  const translation = response.data.responseData.translatedText;
	  res.json({ translation });
	} catch (error) {
	  res.status(500).send(error.message);
	}
  });
  


app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})

