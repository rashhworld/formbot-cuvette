import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Settings from "./pages/Settings"
import Workspace from "./pages/Workspace"
import Theme from "./pages/Theme"
import Response from "./pages/Response"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/theme' element={<Theme />} />
        <Route path='/response' element={<Response />} />
      </Routes>
    </Router>
  )
}

export default App
