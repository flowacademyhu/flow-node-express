const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const methodOverride = require('method-override');

const app = express();

const Model = require('./model');
const Student = new Model();

Student.connect();
Student.init();

app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));
  
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.use(express.static('./public'));

hbs.registerPartials(path.join(__dirname + '../../views/partials'));
hbs.registerHelper('isSelected', (input, value) => input === value ? 'selected' : '');

const studentsController = require('./controller');
studentsController(app, Student);

app.get('/', (req, res) => {
  res.redirect('/students');
});

app.get('*', (req, res) => {
  res.render('errors/404');
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.render('errors/500', {error: error});
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
