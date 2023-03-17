const router = require("express").Router()
const response = require('../controllers/response.controllers')

router.get('/', response.getAll)
router.post('/', response.store)
router.post('/bot/:postId', response.storeBotAnswer)

module.exports = router