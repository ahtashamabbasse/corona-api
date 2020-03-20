const express = require('express');
const router = express.Router();

const postController = require('../controller/apiController');
const post=new postController();

router.get('/', post.getAllPosts);


module.exports = router;
