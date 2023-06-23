const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const usersApiIP = process.env.USERS_API_IP;
const usersApiPort = process.env.USERS_API_PORT
const proxyUsers = createProxyMiddleware({target: `http://${usersApiIP}:${usersApiPort}`, changeOrigin:true})
module.exports = proxyUsers