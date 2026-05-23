
import './App.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Landing from './components/Pages/Landing.jsx'
import Dashboard from './components/Layout/Dashboard.jsx'
import Login from './components/Pages/Login.jsx'
import Signup  from "./components/Pages/Signup.jsx"
import ProtectedRoute from './ProtectedRoute.jsx'
function App() {

  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
