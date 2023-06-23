const{Router} = require('express');
const {
    createChatPost,
    addNewMessagePut,
    getMessages
} = require ('../controllers/chats');
const router = Router();
router.post('/createChat', createChatPost);
router.put('/addNewMessage', addNewMessagePut);
router.post('/getChat', getMessages);
module.exports = router;
