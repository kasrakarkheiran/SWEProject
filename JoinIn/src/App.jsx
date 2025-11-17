import {HashRouter as Router, Routes, Route} from "react-router-dom"
import {Landing} from './pages/Landing'
import {Signup}  from './pages/Signup'
import {Login} from './pages/Login.jsx'
import {Home} from './pages/Home'
import {Layout} from './components/Layout'

function App() {
  //Pages so far:
  //Landing
  //Sign up
  //Log in
  //Home

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
