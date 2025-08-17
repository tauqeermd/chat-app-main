// import { useState } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import Login from './pages/login/Login.jsx';
import ForgotPassword from './pages/forgotPassword/ForgotPassword.jsx';
import ResetPassword from './pages/resetPassword/ResetPassword.jsx';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
  const {authUser} = useAuthContext();

  return (
    <>
      <div className={`${authUser ? 'p-0' : 'p-2 sm:p-4'} h-screen flex items-center justify-center`}>
        <Routes>
          <Route path = '/' element = {authUser ? <Home /> : <Navigate to = {"/login"} />} />
          <Route path = '/login' element = {authUser ? <Navigate to = "/" />: <Login />} />
          <Route path = '/signup' element = {authUser ? <Navigate to = "/" />: <SignUp />} />
          <Route path = '/forgot-password' element = {authUser ? <Navigate to = "/" />: <ForgotPassword />} />
          <Route path = '/reset-password/:token' element = {authUser ? <Navigate to = "/" />: <ResetPassword />} />
        </Routes>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              padding: '12px',
              fontSize: '14px',
            },
          }}
        />
      </div>
    </>
  )
}

export default App
