const articleModel =  require('../models/article.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 


module.exports = {
    store:  async(req,res,next) => {
        try{
           const body  = req.body.body
           const  title =  req.body.title 

            const response = await openai.createCompletion({
                model: "ada",
                prompt:`Genere moi  un article  publicitaire bien claire de 450 mots avec l'introduction explication  et enfin la conclusion dans le titre est ${title} qui parle de :${body}`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
            articleModel.create(req.body, (err, newPost) => {
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