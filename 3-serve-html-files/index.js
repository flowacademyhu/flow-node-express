const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  if (request.url === '/') {
    fs.readFile('./views/index.html', (error, html) => {
      response.writeHeader(200, {'Content-Type': 'text/html'});  
      response.write(html); 
      response.end();
    });
  } else if (request.url === '/about') {
    fs.readFile('./views/about.html', (error, html) => {
      response.writeHeader(200, {'Content-Type': 'text/html'});  
      response.write(html); 
      response.end();
    });
  }
});

server.listen(3000, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`server is listening on 3000`);
  }
});
