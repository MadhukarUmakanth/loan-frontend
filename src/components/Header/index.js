import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Ensure you have a CSS file for styling

const Header = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLoanClick = () => {
        navigate('/loan');
    };

    const handleLoginClick = () => {
        // Optional: Clear user session or auth data here
        // localStorage.removeItem('authToken');
        // sessionStorage.removeItem('authToken');
        
        navigate('/login', { replace: true }); // Replaces current page in history stack
    };

    const handlePayClick = () => {
        navigate('/pay');
    };

    return (
        <header className="header-container">
            <div className="logo-container">
                <h1 className="app-name">𝐂𝐚𝐬𝐡𝐖𝐚𝐯𝐞</h1>
            </div>

            <nav className="nav-container">
                <ul className="nav-list">
                    <li className="nav-item">
                        <button onClick={handleHomeClick} className="nav-link">HOME</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLoanClick} className="nav-link">LOAN</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={handlePayClick} className="nav-link">REPAY</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLoginClick} className="nav-link">LOGOUT</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
