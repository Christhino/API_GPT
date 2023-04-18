const annoncesModel =  require('../models/annonces.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 


module.exports = {
    store:  async(req,res,next) => {
        try{
            const  services  = req.body.services
            const  promotion =  req.body.promotion 
            const  Ocasion =  req.body.Ocasion 
            const  description =  req.body.description 

            const response = await openai.createCompletion({
                model: "ada",
                prompt:`Genere moi  un annonces  publicitaire sur les reseau sociaux bien claire de 300 mots qui parle  de  ${description} dans le serviices est ${services} qui a une promotion de ${promotion} pour l'occasion rare  de ${Ocasion} liste au moins 3  minimum de d'annonces`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
            annoncesModel.create(req.body, (err, newPost) => {
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