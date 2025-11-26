import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Landing} from './pages/Landing'
import {Signup}  from './pages/Signup'
import {Login} from './pages/Login.jsx'
import {Home} from './pages/Home'
import {Profile} from './pages/Profile'
import {Layout} from './components/Layout'
import {useAuthContext} from './hooks/useAuthContext.jsx';
import VerifyPending from './pages/VerifyPending.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';

function App() {
  //Pages so far:
  //Landing
  //Sign up
  //Log in
  //Home
  //Profle

  const {user,dispatch} = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/home" element={user ? <Home/> : <Navigate to="/"/>}/>
          <Route path="/profile" element={user ? <Profile/> : <Navigate to="/"/>}/>
        </Route>
        
        <Route path="/" element={!user ? <Landing/> : <Navigate to="/home"/>}/>
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/verify-pending"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/home"/>}/>
        
        <Route path="/verify-pending" element={<VerifyPending/>}/>
        <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
