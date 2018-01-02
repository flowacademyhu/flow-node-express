const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let students = require('../students')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
  res.json({students: students});
});

app.post('/students', (req, res) => {
  students.push({
    name: req.body.name,
    sex: req.body.sex,
    score: req.body.score,
    age: req.body.age
  });

  res.json({students: students});
});

app.get('/students/:id', (req, res) => {
  const student = students.find(student =>
    student.id === parseInt(req.params.id));

  if (student) {
    res.json({student: student});
  } else {
    res.json({message: 'Student not found'});
  }
});

app.delete('/students/:id', (req, res) => {
  students = students.filter(student =>
    student.id !== parseInt(req.params.id));

  res.json({students: students});
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
    
    res.json({students: students});
  } else {
    res.json({message: 'Student not found'});
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
