import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import { getAllAccounts, getOneAccount, createAccount, deleteAccount, updateAccount } from './api'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from '../pages/Landing'
import { SignIn } from '../pages/SignIn'

function App() {
  
  
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
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
      {/* <button onClick={makeAccount}>Login</button> */}
    </Router>
  )
}

export default App
