const  router =  require("express").Router()

const annonces =  require('../controllers/annonces.controller')

router.post('/', annonces.store)

module.exports = router