import React from 'react'
import Signin from './Components/Signin'
import { Route,Routes } from 'react-router-dom'
import Login from './Components/Login'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/login' element={ <Login />}/>
      <Route path='/' element={<Signin />}/>
    </Routes>
     
    </div>
  )
}
export default App
