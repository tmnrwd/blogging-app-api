const express = require('express');
const router = express.Router();
const posts = require ('./postController')


/* GET home page. */
router.get('/postlist', posts.index)
router.get('/postlist/:id', posts.show)
router.post('/postlist/create', posts.create)
router.delete('/postlist/:id', posts.delete)
router.put('/postlist/:id', posts.update)

module.exports = router; 