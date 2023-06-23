const express = require('express');
const {
    createUserPost,
    userByUsernameGet,
    userUpdatePut,
    userUpdateProfilePhotoPatch,
    similarUserByUsernameGet
} = require('../controllers/Users');
const { validateJWT } = require('../middlewares/validationJWT');
const router = express.Router();

router.get('/:username', userByUsernameGet); 
router.get('/findUsers/:username',[validateJWT], similarUserByUsernameGet); 
router.post('/', createUserPost);
router.put('/:username',[validateJWT], userUpdatePut);
router.patch('/:username',[validateJWT], userUpdateProfilePhotoPatch);

module.exports = router;
