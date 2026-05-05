import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Research from './pages/Research'
import Documents from './pages/Documents'
import Team from './pages/Team'

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[#f4f7f4] dark:bg-[#080f1e] transition-colors duration-300 flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/research"  element={<Research />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/team"      element={<Team />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}
