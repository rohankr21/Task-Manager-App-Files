# CreateMyTests

A full-stack web app to create, take, and analyze tests with AI-powered question generation.

## Features
- Create tests manually with MCQ, True/False, and One Word questions
- AI question generation using Groq (Llama 3.3 70B)
- Take tests with countdown timer and question navigation
- Results with score breakdown
- Review answers with explanations

## Tech Stack
- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express
- **Database:** SQLite
- **AI:** Groq API (Llama 3.3 70B)

## Setup

### Prerequisites
- Node.js installed
- Groq API key (free at console.groq.com)

### Installation

1. Clone the repository
```bash
   git clone https://github.com/yourusername/testweb.git
   cd testweb
```

2. Install frontend dependencies
```bash
   cd client
   npm install
```

3. Install backend dependencies
```bash
   cd ../server
   npm install
```

4. Create `.env` file in `server/` folder

GROQ_API_KEY=your_groq_api_key_here

5. Start the backend
```bash
   cd server
   node index.js
```

6. Start the frontend
```bash
   cd client
   npm run dev
```

7. Open `http://localhost:5173`

## Project Structure
testweb/
├── client/          # React frontend
│   └── src/
│       ├── pages/       # Home, CreateTest, AIGenerate, TakeTest, Results, Review
│       ├── components/  # Header, Timer, etc.
│       └── api/         # fetch functions
└── server/          # Express backend
├── routes/      # tests.js, ai.js, upload.js
├── db.js        # SQLite setup
└── index.js     # Entry point

## Remaining Features
- Edit existing test
- Delete test
- Past attempts history