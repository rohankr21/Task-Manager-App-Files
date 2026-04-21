const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/generate', async (req, res) => {
  const { topic, difficulty, questionType, questionCount, subjects, styles_list, includeExplanation } = req.body

  const prompt = `Return ONLY a JSON array with exactly ${questionCount} ${questionType} questions about: ${topic}. Difficulty: ${difficulty}. Subject: ${subjects.join(', ') || 'general'}. Style: ${styles_list.join(', ') || 'mixed'}. Include explanations: ${includeExplanation}.

IMPORTANT: Return ONLY the JSON array. No explanation, no markdown. Start with [ and end with ]

Format: [{"text":"question","type":"mcq","options":["A text","B text","C text","D text"],"answer":"A","explanation":"reason"}]`

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 4000,
    })

    const text = completion.choices[0].message.content

    const cleanText = text.replace(/```json|```/g, '').trim()
    const jsonMatch = cleanText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('No JSON array found')

    const questions = JSON.parse(jsonMatch[0])
    res.json({ questions })
  } catch (err) {
    console.error('Error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router