const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const postsApiIP = process.env.POSTS_API_IP;
const postsApiPort = process.env.POSTS_API_PORT;
const postsProxy = createProxyMiddleware({target: `http://${postsApiIP}:${postsApiPort}`, changeOrigin:true})
module.exports= postsProxy;