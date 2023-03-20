const  router =  require("express").Router()

const contenu =  require('../controllers/contenu.controller')

router.post('/', contenu.store)

module.exports = router