const {Router} = require('express');
const {
    credentialsCreatePost,
    credentialsLogin, 
    credentialsExisting
} = require ('../controllers/credentials');
const router = Router();
router.post('/', credentialsCreatePost);
router.post('/login', credentialsLogin);
router.get('/:email', credentialsExisting);
module.exports = router;