const express = require('express')
const router = express.Router()
const db = require('../db')

// get all tests
router.get('/', (req, res) => {
  db.all('SELECT * FROM tests ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// create a test
router.post('/', (req, res) => {
  const { title, time_limit, questions } = req.body
  db.run('INSERT INTO tests (title, time_limit) VALUES (?, ?)',
    [title, time_limit],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      const testId = this.lastID
      questions.forEach(q => {
        db.run(
          'INSERT INTO questions (test_id, type, text, options, answer, explanation) VALUES (?,?,?,?,?,?)',
          [testId, q.type, q.text, JSON.stringify(q.options), q.answer, q.explanation]
        )
      })
      res.json({ id: testId, message: 'Test created' })
    }
  )
})

// get single test with questions
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tests WHERE id = ?', [req.params.id], (err, test) => {
    if (err) return res.status(500).json({ error: err.message })
    db.all('SELECT * FROM questions WHERE test_id = ?', [req.params.id], (err, questions) => {
      if (err) return res.status(500).json({ error: err.message })
      questions = questions.map(q => ({ ...q, options: JSON.parse(q.options || '[]') }))
      res.json({ ...test, questions })
    })
  })
})

// delete a test
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tests WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Test deleted' })
  })
})


//save result 
router.post('/:id/results', (req, res) => {
  const {score, total, correct, wrong, skipped, answers} = req.body
  db.run(

    'INSERT INTO results (test_id, score, total, time_taken, answers) VALUES (?, ?, ?, ?, ?)',
    [req.params.id, score, total, 0, JSON.stringify(answers)],
    function(err) {
      if(err) return res.status(500).json({ error: err.message})
      res.json({ id: this.lastID, message: 'Result saved'})
    }
  )
})

// get results for all tests (for home page stats) 
router.get('/all/results', (req, res) => {
  db.all('SELECT * FROM results', [], (err, rows) => {
    if(err) return res.status(500).json({error: err.message})
    res.json(rows)
  })
})


module.exports = router