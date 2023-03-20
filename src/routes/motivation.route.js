const router = require("express").Router()
const motivation = require('../controllers/motivation.controller')

router.post('/', motivation.store)

module.exports = router
