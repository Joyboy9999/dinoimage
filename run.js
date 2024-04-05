const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;
  const jsonFile = path.join(__dirname, 'metadata', `${url}`);

  fs.readFile(jsonFile, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('JSON file not found');
      return;
    }

    try {
      const json = JSON.parse(data);
      const { name } = json;

      const imageFile = path.join(__dirname, 'finalnftdino', `${name}.png`);
      fs.readFile(imageFile, (err, image) => {
        if (err) {
          res.statusCode = 404;
          res.end('Image file not found');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image);
      });
    } catch (err) {
      res.statusCode = 500;
      res.end('Error parsing JSON file');
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});