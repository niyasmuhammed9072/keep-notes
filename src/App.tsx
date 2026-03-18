import React from 'react'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
