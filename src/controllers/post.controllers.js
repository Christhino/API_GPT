const postModel = require('../models/post.model')
const axios = require('axios')


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
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
    
            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
           

            // let data = response.data.choices[0].text
            
            postModel.create(req.body, (err, newPost) => {
                if(response.data.choices[0].text) {
                    res.send(JSON.stringify({
                        message: response.data.choices[0].text
                    }));
                }
            })
            

        } catch (error) {
            next(error)
        }
    }, 
}