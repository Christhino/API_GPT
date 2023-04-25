const  paiModel  = require('../models/payement.model')

const stripe = require('stripe')(
    process.env.SRTIPE_SECRET_KEY
);

module.exports ={
   store : async(req,  res,  next) => {
      try{
        const { email, cardNumber, cardExpMonth, cardExpYear, cardCVC } = req.body;
        const customer = await stripe.customers.create({
            email,
            payment_method: 'card',
            source: {
              object: 'card',
              number: cardNumber,
              exp_month: cardExpMonth,
              exp_year: cardExpYear,
              cvc: cardCVC
            }
        });
        await stripe.charges.create({
            amount: 300, // Montant en centimes
            currency: 'eur',
            customer: customer.id,
            payment_method: 'card',
      confirm: true,
            description: 'Paiement pour 10.000 mots'
        });
         
        res.status(200).json({ message: 'Paiement effectué avec succès' });

      }catch(error) {
        console.error(error)
        res.status(500).json({ error: error.message }); 
      }
   }
}
