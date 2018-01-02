const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const methodOverride = require('method-override');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'))
  
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.use(express.static('./public'));

hbs.registerPartials(path.join(__dirname + '../../views/partials'));
hbs.registerHelper('isSelected', (input, value) => input === value ? 'selected' : '');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'students'
});

connection.connect(error => {
  if (error) return console.log(error);

  console.log('Successfully connected to database');
  const createTable = `CREATE TABLE IF NOT EXISTS students 
  (id int NOT NULL AUTO_INCREMENT, 
  name varchar(100),  
  sex varchar(100), 
  score int, 
  age int, 
  PRIMARY KEY(id));`
  
  connection.query(createTable, (error, rows, fields) => {
    if (error) res.render('errors/500', {error: error});

    console.log('Students table created.');
  });
});

app.get('/', (req, res) => {
  res.redirect('/students');
});

app.get('/students', (req, res) => {
  const selectAll = 'SELECT * FROM students;';

  connection.query(selectAll, (error, rows, fields) => {
    if (error) {
      response.render('errors/500', {error: error});
    }

    res.render('students/index', {students: rows});
  });
});

app.get('/students/new', (req, res) => {
  res.render('students/new');
});

app.post('/students', (req, res) => {
  const createStudent = `INSERT INTO students (name, sex, score, age) VALUES 
    ('${req.body.name}', '${req.body.sex}',
    '${req.body.score}', '${req.body.age}');`;

    connection.query(createStudent, function (error, rows, fields) {
      if (error) return res.render('errors/500', {error: error});

      res.redirect('/students');
    });
});

app.get('/students/:id', (req, res) => {
  const findStudent = `SELECT * FROM students WHERE id='${req.params.id}';`;

  connection.query(findStudent, function (error, rows, fields) {
    const student = rows[0];

    if (error) return res.render('errors/500', {error: error});

    res.render('students/show', {student: student});
  });
});

app.get('/students/:id/edit', (req, res) => {
  const findStudent = `SELECT * FROM students WHERE id='${req.params.id}';`;

  connection.query(findStudent, function (error, rows, fields) {
    const student = rows[0];

    if (error) return res.render('errors/500', {error: error});

    res.render('students/edit', {student: student});
  });
});

app.put('/students/:id', (req, res) => {
  const changedStudent = `UPDATE students SET name='${req.body.name}', sex='${req.body.sex}',
    score='${req.body.score}', age='${req.body.age}' WHERE id='${req.params.id}';`;

  connection.query(changedStudent, (error, rows, fields) => {
    if (error) return res.render('errors/500', {error: error});

    res.redirect('/students');
  });
});

app.delete('/students/:id', (req, res) => {
  const deleteStudent = `DELETE FROM students WHERE id='${req.params.id}';`;

  connection.query(deleteStudent, error => {
    if (error) return res.render('errors/500', {error: error});
    
    res.redirect('/students');
  });
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
