const chatModel =  require('../models/chat.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 


module.exports = {
    store:  async(req,res,next) => {
        try{
            const body  = req.body.body
            
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Ce qui suit est une conversation avec un assistant IA. L'assistant est serviable, créatif, intelligent et très sympathique.\n\nHuman: ${body}.\nAI:`,
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            })
            chatModel.create(req.body, (err, newPost) => {
                if(response.data.choices[0].text) {
                    res.send(JSON.stringify({
                        message: response.data.choices[0].text
                    }));
                }
            })
        }catch (error) {
            next(error)
        }
    }
}