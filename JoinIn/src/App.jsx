import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import axios from 'axios'
function App() {
  const [data, setData] = useState()
  function createAccount() {
    let accountObject={
      name: "exampleName",
      email: "exampleEmail",
      password: "examplePassword",
      dateCreated: new Date()
    }
    axios.post('http://localhost:3000/accounts/create', accountObject)
  }


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
  return (
    <>
      <h1>JoinIn</h1>
      <h2>CURRENT DATABASE ENTRIES</h2>
      {JSON.stringify(data)} //Frontend backend connection verified
      <button onClick={createAccount}>Login</button>
    </>
  )
}

export default App
