const compression = require('compression');
const express = require('express');
const cors = require('cors');
// const proxy = require('express-http-proxy');
// const apiProxy = require('http-proxy-middleware');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const app = express();

const PORT = 3000;

const serverOne = 'http://54.218.33.175:3001',
    ServerTwo = 'http://54.218.33.175:3001',
    ServerThree = 'http://18.236.82.217:3003';

app.use(compression());
app.use('/:id', express.static('public'));
app.use(express.json());
app.use(cors())

// Description Proxy 

app.all('/dec-service/*', (req, resp) => {
    console.log('Proxy to Description server');
    apiProxy.web(req, resp, {target: ServerTwo});
});
  
 app.all('/getallproducts/*', (req, resp) => {
    console.log('Proxy to Description server API');
    apiProxy.web(req, resp, {target: ServerTwo});
});
  
app.all('/getsingleproduct/*', (req, resp) => {
    console.log('Proxy to Description server API');
    apiProxy.web(req, resp, {target: ServerTwo});
});

// Q and A Proxy

app.all('/qna-service/*', (req, resp) => {
    console.log('Proxy to Q and A server');
    apiProxy.web(req, resp, {target: ServerTwo});
});
  
app.all('/questions/*', (req, resp) => {
    console.log('Proxy to Q and A server API');
    apiProxy.web(req, resp, {target: serverOne});
});

// Review Proxy

app.all('/rev-service/*', (req, resp) => {
    console.log('Proxy to Review server');
    apiProxy.web(req, resp, {target: ServerThree});
});
  
app.all('/review-api/*', (req, resp) => {
console.log('Proxy to Review server API');
apiProxy.web(req, resp, {target: ServerThree});
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));