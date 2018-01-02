module.exports = (app, Student) => {
  app.get('/students', (req, res) => {
    Student.findAll((error, students) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.render('students/index', {students: students});
      }
    });
  });
  
  app.get('/students/new', (req, res) => {
    res.render('students/new');
  });
  
  app.get('/students/:id/edit', (req, res) => {
    Student.findById(req.params.id, (error, student) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.render('students/edit', {student: student});
      }
    });
  });
  
  app.post('/students', (req, res) => {
    console.log(req.body)
    Student.create(req.body, (error, student) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.redirect('/students');
      }
    });
  });

  app.get('/students/:id', (req, res) => {
    Student.findById(req.params.id, (error, student) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.render('students/show', {student: student});
      }
    });
  });
  
  app.delete('/students/:id', (req, res) => {
    Student.delete(req.params.id, (error, student) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.redirect('/students');
      }
    });
  });
  
  app.put('/students/:id', (req, res) => {
    console.log('put')
    Student.update(req.body, req.params.id, (error, student) => {
      if (error) {
        res.render('errors/500', {error: error});
      } else {
        res.redirect('/students/' + req.params.id);
      }
    });
  });
};