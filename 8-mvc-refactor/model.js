const mysql = require('mysql');

class Model {
  constructor () {
    this.connection = null;
  }

  connect () {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'students'
    });

    this.connection.connect();
  }

  init () {
    const studentsTable = `CREATE TABLE IF NOT EXISTS students 
    (id int NOT NULL AUTO_INCREMENT, 
    name varchar(100),  
    sex boolean, 
    score int, 
    age int, 
    PRIMARY KEY(id));`;

    this.connection.query(studentsTable, (error, rows, fields) => {
      if (error) throw error;
      console.log('Students table created.');
    });
  }

  findAll (callback) {
    const list = `SELECT * FROM students;`;
    this.connection.query(list, (error, rows, fields) => {
      if (error) return callback(error);
      
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }

  findById (id, callback) {
    const findStudent = `SELECT * FROM students WHERE id='${id}';`;

    this.connection.query(findStudent, (error, rows, fields) => {
      const student = rows[0];

      if (error) return callback(error);

      if (rows && rows.length > 0) {
        return callback(null, student);
      } else {
        return callback(null, []);
      }
    });
  }

  create (queryObject, callback) {
    console.log(queryObject)
    const createStudent = `INSERT INTO students (name, sex, score, age) VALUES 
    ('${queryObject.name}', '${queryObject.sex}',
    '${queryObject.score}', '${queryObject.age}');`;

    this.connection.query(createStudent, (error, rows, fields) => {
      if (error) return callback(err);
      
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }

  delete (id, callback) {
    const deleteStudent = `DELETE FROM students WHERE id='${id}';`;

    this.connection.query(deleteStudent, (error, rows, fields) => {
      const student = rows[0];

      if (error) return callback(error);
      
      if (rows && rows.length > 0) {
        return callback(null, student);
      } else {
        return callback(null, []);
      }
    });
  }

  update (queryObject, id, callback) {
    console.log(queryObject, id)
    const changedStudent = `UPDATE students SET name='${queryObject.name}', sex='${queryObject.sex}',
    score='${queryObject.score}', age='${queryObject.age}' WHERE id='${id}';`;

    this.connection.query(changedStudent, (error, rows, fields) => {
      if (error) return callback(error);
      
      if (rows && rows.length > 0) {
        return callback(null, rows);
      } else {
        return callback(null, []);
      }
    });
  }
}

module.exports = Model;
