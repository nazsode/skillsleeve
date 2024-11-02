import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './Register';
import Login from './Login';
import SendResetLink from './SendResetLink';
import NewPassword from './NewPassword';
// import CompanyHome from './CompanyHome';
// import CodeScreen from './CodeScreen';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/send-reset-link" element={<SendResetLink />} />
      <Route path="/new-password" element={<NewPassword />} />
      {/* Commented out other routes
      <Route path="/company-home" element={<CompanyHome />} />
      <Route path="/codescreen" element={<CodeScreen />} />
      */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
