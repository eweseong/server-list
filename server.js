/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const app = express();
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

app.get('*', (req, res) => {
  const isContent = allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0;
  res.sendFile(path.resolve(`dist/server-list/${isContent ? req.url : "index.html"}`));
});

const port = process.env.port || 8888;
app.listen(port, function () {
  console.log('application listening on port: ' + port);
});
