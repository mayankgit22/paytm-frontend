import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DashBoard from './components/DashBoard';
function App() {
const [balance, setBalance] = useState(0);


  return (
  <>
    <div className="flex flex-col items-center ">

  <Router>
    <Routes>
        <Route path='/' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/Dashboard' element={<DashBoard/>} />
    </Routes>
  </Router>
  </div>

  </>
  )
}

export default App
