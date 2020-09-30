const express = require('express');
const router = express.Router();
const posts = require ('./postController') //importing postController as posts


/* GET home page. */
router.get('/postlist', posts.index) //triggers posts.index from controller
router.get('/postlist/:id', posts.show)
router.post('/postlist/create', posts.create)
router.delete('/postlist/:id', posts.delete)
router.put('/postlist/:id', posts.update) //updating

module.exports = router; //exporting as module. can't use export default etc. b/c we're not using ES6 or classes