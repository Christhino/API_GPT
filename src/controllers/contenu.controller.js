const contenuModel =  require('../models/contenu.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 


module.exports = {
    store:  async(req,res,next) => {
        try{
           const body  = req.body.body
           const  title =  req.body.title 

            const response = await openai.createCompletion({
                model: "ada",
                prompt:`Genere moi  un contenu  publicitaire bien claire de 200 mots  dans le titre est ${title} qui parle de :${body},  et si le ${body}  entre compte plus de  100 mots alors  refomule juste  le ${body} en un nouveau contenu  de 200 mots  et liste le differents contenu`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
            contenuModel.create(req.body, (err, newPost) => {
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