const http = require('http');

const server = http.createServer((request, response) => {
  response.end('hello world');
})

server.listen(3000, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`server is listening on 3000`);
  }    
});
