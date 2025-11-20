import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Landing} from './pages/Landing'
import {Signup}  from './pages/Signup'
import {Login} from './pages/Login.jsx'
import {Home} from './pages/Home'
import {Profile} from './pages/Profile'
import {Layout} from './components/Layout'
import {useAuthContext} from './hooks/useAuthContext.jsx';

function App() {
  //Pages so far:
  //Landing
  //Sign up
  //Log in
  //Home
  //Profle

  const {user} = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/home" element={user ? <Home/> : <Navigate to="/"/>}/>
        </Route>
        <Route path="/profile" element={user ? <Profile/> : <Navigate to="/"/>}/>

        <Route path="/" element={!user ? <Landing/> : <Navigate to="/home"/>}/>
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/home"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/home"/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
