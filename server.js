/* eslint-disable no-console */
const path = require('path');
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg'
];

const compression = require('compression');
const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');

app.use(compression());
app.get('*', (req, res) => {
  const isContent = allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0;
  res.sendFile(path.resolve(`dist/server-list/${isContent ? req.url : "index.html"}`));
});

// Create an HTTP service.
const port = process.env.port || 8888;
http.createServer(app).listen(port, () => {
  console.log('application listening on port: ' + port);
});
// Create an HTTPS service identical to the HTTP service.
const options = {
  key: fs.readFileSync('./security/server.key'),
  cert: fs.readFileSync('./security/server.cert'),
  requestCert: false,
  rejectUnauthorized: false
};
const securePort = process.env.securePort || 8889;
https.createServer(options, app).listen(securePort, () => {
  console.log('application listening on port: ' + securePort);
});
