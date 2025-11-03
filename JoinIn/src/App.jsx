import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import { getAllAccounts, getOneAccount, createAccount, deleteAccount, updateAccount } from './api'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from './pages/Landing'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
// import { firebase } from 'firebase/auth'
import {Navbar} from './components/Navbar'
import {Layout} from './components/Layout'

function App() {
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());
  
  // const [data, setData] = useState()
  // function makeAccount() {
  //   let accountObject={
  //     name: "exampleName",
  //     email: "exampleEmail",
  //     password: "examplePassword",
  //     dateCreated: new Date()
  //   }
  //   createAccount(accountObject);
  // }


  /*useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/accounts');
      console.log(response.data);    
      if (response.status === 200) {
        setData(response.data);
      }
    }
    fetchData();
  }, []);*/

  //Pages so far:
  //Landing
  //SignIn

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </Router>
  )
}

export default App
