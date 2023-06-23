const express = require('express');
const router = express.Router();
const chatsProxy = require('./postsApiProxy')
router.post('/createChat',chatsProxy );
router.put('/addNewMessage', chatsProxy);
router.post('/getChat', chatsProxy);
module.exports = router;