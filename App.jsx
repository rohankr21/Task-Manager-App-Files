import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateTest from './pages/CreateTest'
import AIGenerate from './pages/AIGenerate'
import TakeTest from './pages/TakeTest'
import Results from './pages/Results'
import Review from './pages/Review'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTest />} />
        <Route path="/generate" element={<AIGenerate />} />
        <Route path="/test/:id" element={<TakeTest />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/review/:id" element={<Review />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App