const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const responseModel = require("../models/response.model")
const postModel =  require('../models/post.model') 

const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration); 

module.exports = {
    getAll: async(req, res, next) => {
        try{
            const answers = await responseModel.find()
            return res.json(answers)

        } catch(err){
            next(err)
        }
    }, 

    storeBotAnswer: async(req, res, next) => {
        try{
            const data =  await  postModel.findById(req.params.postId)

            const prompt  =  data.body;
            const url = `https://api.mymemory.translated.net/get?q=${prompt}&langpair=mg|fr`;
            const prompt_translate = await axios.get(url);
            const translation = prompt_translate.data.responseData.translatedText;
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:"Exprime toi amicalement et utilise des emojis. n'oublie de parler de facon claire et de donner a chaque dois des exemples. Propose directement une solution et des directives techniques qu'importe le type de question en repondant a ce:"+translation,
                temperature: 1,
                max_tokens: 400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })

            let bot_response = response.data.choices[0].text
            req.body.isBotAnswer = true 
            req.body.content = bot_response

            responseModel.create(req.body, (err, newBotRes) => {
                if(err) return next(err)
                return res.json(newBotRes)
            })

        } catch(err) {
            next(err)
        }
    },

    store: async(req, res, next) => {
        try{
            responseModel.create(req.body, (err, newResponse) => {
                if(err) return next(err)
                return res.json(newResponse)
            })  
        } catch(err){
            next(err)
        }
    }
}