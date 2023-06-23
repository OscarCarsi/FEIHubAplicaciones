const express = require('express');
const usersProxy = require('./routes/usersRoutes/users');
const postsProxy = require('./routes/postsRoutes/posts');
const credentialsProxy = require ('./routes/usersRoutes/credentials');
const followersProxy = require ('./routes/usersRoutes/followers');
const chatsProxy = require('./routes/postsRoutes/chats');
const {validateJWT} = require('./middleware/validationJWT')
require('dotenv').config();
const app = express()
const port = process.env.PORT;
const host = '192.168.56.1';


app.use('/apiusersfeihub/users', usersProxy);
app.use('/apiusersfeihub/credentials', credentialsProxy);
app.use('/apiusersfeihub/follows', followersProxy);

app.use('/apipostsfeihub/posts', [validateJWT], postsProxy);
app.use('/apipostsfeihub/chats', [validateJWT], chatsProxy);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
