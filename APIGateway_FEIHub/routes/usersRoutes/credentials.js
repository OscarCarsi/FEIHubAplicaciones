const express = require('express');
const router = express.Router();
const credentialsProxy = require ('./usersApiProxy')
router.post('/', credentialsProxy);
router.post('/login', credentialsProxy);
router.get('/:email', credentialsProxy);
module.exports = router;