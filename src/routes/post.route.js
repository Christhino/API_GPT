const router = require("express").Router()
const post = require('../controllers/post.controllers')

router.get('/', post.getAll)
router.get('/:id', post.getById)
router.post('/', post.store)

module.exports = router
