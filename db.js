const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) console.error('Database error:', err)
  else console.log('Database connected')
})

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    time_limit INTEGER DEFAULT 30,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id INTEGER,
    type TEXT,
    text TEXT,
    options TEXT,
    answer TEXT,
    explanation TEXT,
    FOREIGN KEY (test_id) REFERENCES tests(id)
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id INTEGER,
    score INTEGER,
    total INTEGER,
    time_taken INTEGER,
    answers TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests(id)
  )`)
})

module.exports = db