const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const methodOverride = require('method-override');

let students = require('../students')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'))
  
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.use(express.static('./public'));

hbs.registerPartials(path.join(__dirname + '../../views/partials'));
hbs.registerHelper('isSelected', (input, value) => input === value ? 'selected' : '');

app.get('/', (req, res) => {
  res.redirect('/students');
});

app.get('/students', (req, res) => {
  res.render('students/index', {students: students});
});

app.get('/students/new', (req, res) => {
  res.render('students/new');
});

app.post('/students', (req, res) => {
  students.push({
    name: req.body.name,
    sex: req.body.sex,
    score: req.body.score,
    age: req.body.age
  });

  res.redirect('/students');
});

app.get('/students/:id', (req, res) => {
  const student = students.find(student =>
    student.id === parseInt(req.params.id));

  if (student) {
    res.render('students/show', {student: student});
  } else {
    res.redirect('/404');
  }
});

app.get('/students/:id/edit', (req, res) => {
  const student = students.find(student =>
    student.id === parseInt(req.params.id));

  if (student) {
    res.render('students/edit', {student: student});
  } else {
    res.redirect('/404');
  }
});

app.put('/students/:id', (req, res) => {
  const studentIndex = students.findIndex(student =>
    student.id === parseInt(req.params.id));
  
  if (studentIndex) {
    const selectedStudent = students[studentIndex]
  
    selectedStudent.name = req.body.name || selectedStudent.name;
    selectedStudent.sex = req.body.sex || selectedStudent.sex;
    selectedStudent.score = req.body.score || selectedStudent.score;
    selectedStudent.age = req.body.age || selectedStudent.age;
    
    res.render('students/show', {student: selectedStudent});
  } else {
    res.json({message: 'Student not found'});
  }
});

app.delete('/students/:id', (req, res) => {
  students = students.filter(student =>
    student.id !== parseInt(req.params.id));

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
