const express = require('express');
const router = express.Router();
const postsProxy = require('./postsApiProxy')
router.post('/createPost', postsProxy);
router.put('/editPost', postsProxy);
router.delete('/deletePost/:id', postsProxy);
router.get('/postsAuthor/:author', postsProxy);
router.post('/postIdTitle', postsProxy);
router.get('/postsTarget/:target', postsProxy)
router.post('/principalPosts', postsProxy);
router.post('/principalPostsTarget', postsProxy);
router.post('/addComment', postsProxy);
router.put('/editComment', postsProxy);
router.delete('/deleteComment', postsProxy);
router.put('/like/:id', postsProxy);
router.put('/dislike/:id', postsProxy);
router.put('/removeLike/:id', postsProxy);
router.put('/removeDislike/:id', postsProxy);
router.put('/addReport', postsProxy);
router.post('/reportedPost', postsProxy);
module.exports = router;