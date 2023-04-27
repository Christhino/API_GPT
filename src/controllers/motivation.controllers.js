const  motivationModel  =  require('../models/motivation.model')

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration); 

module.exports = {
    store: async(req,res,next) => {
       try { 
            const  bio = req.body.body
            const  user_name =  req.body.nom 
            const  user_prenom =  req.body.prenom 
            const  title =  req.body.title 
        
            const response = await openai.createCompletion({
                model: "text-curie-001",
                prompt:`Je suis ${user_name} ${user_prenom}, et je suis  ${title} voici donc mon  bio ${bio}. Genere moi une lettre de motivation`,
                temperature: 0.5,
                max_tokens: 1400,
                top_p: 1.0,
                frequency_penalty: 0.8,
                presence_penalty: 0.0,
            })
            
            motivationModel.create(req.body, (err, newPost) => {
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