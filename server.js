const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const baseDir = path.join(__dirname);

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const safePath = path.normalize(req.url.split('?')[0]).replace(/^\/+/, '');
  let filePath = path.join(baseDir, safePath || 'index.html');

  if (!filePath.startsWith(baseDir)) {
    res.writeHead(400);
    return res.end('Bad Request');
  }

  const ext = path.extname(filePath) || '.html';

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Server Error');
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server Error');
      }

      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
});

server.listen(port, () => {
  console.log(`Local server running at http://localhost:${port}`);
});
