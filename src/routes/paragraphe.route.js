const  router =  require("express").Router()

const paragraphe =  require('../controllers/paragraphe.controller')

router.post('/', paragraphe.store)

module.exports = router