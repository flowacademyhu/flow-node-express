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

    return new Promise((resolve, reject) => {
      this.connection.query(list, (error, rows, fields) => {
        if (error) reject(error);
        
        if (rows && rows.length > 0) {
          resolve(rows);
        } else {
          resolve([]);
        }
      });
    });
  }

  findById (id, callback) {
    const findStudent = `SELECT * FROM students WHERE id='${id}';`;

    return new Promise((resolve, reject) => {
      this.connection.query(findStudent, (error, rows, fields) => {
        const student = rows[0];
  
        if (error) return reject(error);
  
        if (rows && rows.length > 0) {
          return resolve(student);
        } else {
          return resolve([]);
        }
      });
    });
  }

  create (queryObject, callback) {
    const createStudent = `INSERT INTO students (name, sex, score, age) VALUES 
    ('${queryObject.name}', '${queryObject.sex}',
    '${queryObject.score}', '${queryObject.age}');`;

    return new Promise((resolve, reject) => {
      this.connection.query(createStudent, (error, rows, fields) => {
        if (error) return reject(err);
        
        if (rows && rows.length > 0) {
          return resolve(rows);
        } else {
          return resolve([]);
        }
      });
    });
  }

  delete (id, callback) {
    const deleteStudent = `DELETE FROM students WHERE id='${id}';`;

    return new Promise((resolve, reject) => {
      this.connection.query(deleteStudent, (error, rows, fields) => {
        const student = rows[0];
  
        if (error) return reject(error);
        
        if (rows && rows.length > 0) {
          return resolve(student);
        } else {
          return resolve([]);
        }
      });
    });
  }

  update (queryObject, id, callback) {
    const changedStudent = `UPDATE students SET name='${queryObject.name}', sex='${queryObject.sex}',
    score='${queryObject.score}', age='${queryObject.age}' WHERE id='${id}';`;

    return new Promise((resolve, reject) => {
      this.connection.query(changedStudent, (error, rows, fields) => {
        if (error) return reject(error);
        
        if (rows && rows.length > 0) {
          return resolve(rows);
        } else {
          return resolve([]);
        }
      });
    });
  }
}

module.exports = Model;
