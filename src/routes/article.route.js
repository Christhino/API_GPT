const  router =  require("express").Router()

const article =  require('../controllers/article.controller')

router.post('/', article.store)

module.exports = router