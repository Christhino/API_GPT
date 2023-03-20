const router = require("express").Router()
const motivation = require('../controllers/motivation.controllers')

router.post('/', motivation.store)

module.exports = router

