const  router =  require("express").Router()

const pai =  require('../controllers/pai.controller')

router.post('/', pai.store)

module.exports = router