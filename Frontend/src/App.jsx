import React from 'react'
import Signin from './Components/Signin'
import { Route,Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={ <Signin />}/>
      <Route path='/login' element={<Signin />}/>
    </Routes>
     
    </div>
  )
}
export default App
