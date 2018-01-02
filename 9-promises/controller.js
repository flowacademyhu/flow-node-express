module.exports = (app, Student) => {
  app.get('/students', (req, res) => {
    Student
      .findAll()
      .then(students => res.render('students/index', {students}))
      .catch(error => res.render('errors/500', {error}));
  });
  
  app.get('/students/new', (req, res) => {
    res.render('students/new');
  });
  
  app.get('/students/:id/edit', (req, res) => {
    Student.findById(req.params.id)
      .then(student => res.render('students/edit', {student: student}))
      .catch(error => res.render('errors/500', {error}));
  });
  
  app.post('/students', (req, res) => {
    
    Student.create(req.body)
      .then(() => res.redirect('/students'))
      .catch(error => res.render('errors/500', {error}));
  });

  app.get('/students/:id', (req, res) => {
    Student
      .findById(req.params.id)
      .then(student => res.render('students/show', {student: student}))
      .catch(error => res.render('errors/500', {error}));
  });
  
  app.delete('/students/:id', (req, res) => {
    Student.delete(req.params.id)
      .then(student => res.redirect('/students'))
      .catch(error => res.render('errors/500', {error}));
  });
  
  app.put('/students/:id', (req, res) => {
    Student.update(req.body, req.params.id)
      .then(() => res.redirect(`/students/${req.params.id}`))
      .catch(error => res.render('errors/500', {error}));
  });
};