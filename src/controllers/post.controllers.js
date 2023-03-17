const postModel = require('../models/post.model')
const axios = require('axios')


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 

module.exports = { 

    getById: async(req, res, next) => {
        try{
            postModel.findById(req.params.id, (error, item) => {
                if(error) return next(error)
                return res.json(item)
            })
        } catch(err) {
            next(err)
        }
    }, 

    getAll: async(req, res, next) => {
        const data = await postModel.find().populate('')
        res.json(data)
    }, 

    store: async(req, res, next) => {
        try {
            const prompt = req.body.body  
            const title =  req.body.title

            const url = `https://api.mymemory.translated.net/get?q=${prompt}&langpair=mg|fr`;
            const urlTTitle =`https://api.mymemory.translated.net/get?q=${title}&langpair=mg|fr`
            
            const title_translate =  await axios.get(urlTTitle)

            const prompt_translate = await axios.get(url);
            const translation = prompt_translate.data.responseData.translatedText;
            const translation_t =  title_translate.data.responseData.translatedText;
            
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:`extract technical keywords from this article text with the most important keywords by using fewer keywords: article title: ${translation_t} . article body: ${translation}`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
           

            let data = response.data.choices[0].text
            const result = data.slice(12, data.length)

            req.body.keywords = result

            postModel.create(req.body, (err, newPost) => {
                if(err) return next(err) 
                res.json(newPost)
            })

        } catch (error) {
            next(error)
        }
    }, 
}