const http = require('http');

const server = http.createServer((request, response) => {
  if (request.url === '/') {
    response.end('home');
  } else if (request.url === '/about') {
    response.end('I\'m a simple node server');
  } else {
    response.end('not found')
  }
})

server.listen(3000, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`server is listening on 3000`);
  }
})