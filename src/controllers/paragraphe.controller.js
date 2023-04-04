const paragrapheModel =  require('../models/paragraphe.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration); 


module.exports = {
    store:  async(req,res,next) => {
        try{
            const  sujet = req.body.sujet
            const keywords = req.body.keywords
            const tonalite = req.body.tonalite

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:`Genere differente paragraphe que tu vas liste  au moins 10 paragraphes  qui parle de  ${sujet} avec les mots cles  ${keywords} de facon  ${tonalite}`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
            paragrapheModel.create(req.body, (err, newPost) => {
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