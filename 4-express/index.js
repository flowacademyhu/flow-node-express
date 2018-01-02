const express = require('express');
const path = require('path');

const app = express();

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/about', (request, response) => {
  response.sendFile(path.join(__dirname, '../views/about.html'));
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
