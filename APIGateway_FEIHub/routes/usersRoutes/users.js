const express = require('express');
const router = express.Router();
const proxyUsers = require ('./usersApiProxy')
router.get('/:username', proxyUsers); 
router.get('/findUsers/:username', proxyUsers); 
router.post('/', proxyUsers);
router.put('/:username', proxyUsers);
router.patch('/:username', proxyUsers);

module.exports = router;
