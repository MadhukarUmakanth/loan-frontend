// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import LoanForm from './components/LoanForm';
import Repayment from './components/Repayment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<HomePage/>}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path='loan' element={<LoanForm/>}/>
                <Route path='pay' element={<Repayment/>}/>

                
            </Routes>
        </Router>
    );
}

export default App;
