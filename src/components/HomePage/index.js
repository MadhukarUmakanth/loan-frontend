import React from 'react';
import './index.css';  // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import Header from '../Header';


const HomePage = () => {
    const navigate = useNavigate();

    const onClickloan = () => {
        navigate('loan')
    
    }
    return (
        
        <div>
            <Header/>
            <section className="hero-section">
            <div className="hero-container">
                {/* Left Side with Image */}
                <div className="hero-image">
                    <img
                        src="https://img.freepik.com/free-vector/card-file-abstract-concept-illustration_335657-3905.jpg"
                        alt="Mini Loan"
                        className="image"
                    />
                </div>
                
                {/* Right Side with Text Content */}
                <div className="hero-content">
                    <h1 className="hero-heading">𝐆𝐞𝐭 𝐈𝐧𝐬𝐭𝐚𝐧𝐭 𝐋𝐨𝐚𝐧𝐬 𝐚𝐭 𝐘𝐨𝐮𝐫 𝐅𝐢𝐧𝐠𝐞𝐫𝐭𝐢𝐩𝐬</h1>
                    <p className="hero-description">
                    𝑶𝒖𝒓 𝑴𝒊𝒏𝒊 𝑳𝒐𝒂𝒏 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏 𝒂𝒍𝒍𝒐𝒘𝒔 𝒚𝒐𝒖 𝒕𝒐 𝒂𝒑𝒑𝒍𝒚 𝒇𝒐𝒓 𝒒𝒖𝒊𝒄𝒌 𝒂𝒏𝒅 𝒆𝒂𝒔𝒚 𝒍𝒐𝒂𝒏𝒔 𝒘𝒊𝒕𝒉 𝒎𝒊𝒏𝒊𝒎𝒂𝒍 𝒑𝒂𝒑𝒆𝒓𝒘𝒐𝒓𝒌.     
                                         𝑬𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆 𝒂 𝒔𝒎𝒐𝒐𝒕𝒉, 𝒇𝒂𝒔𝒕, 𝒂𝒏𝒅 𝒔𝒆𝒄𝒖𝒓𝒆 𝒑𝒓𝒐𝒄𝒆𝒔𝒔 𝒕𝒉𝒂𝒕 𝒈𝒆𝒕𝒔 𝒚𝒐𝒖 𝒕𝒉𝒆 𝒇𝒖𝒏𝒅𝒔 𝒚𝒐𝒖 𝒏𝒆𝒆𝒅 𝒊𝒏 𝒏𝒐 𝒕𝒊𝒎𝒆.
                    </p>
                    <button className="apply-now-btn" onClick={onClickloan}>APPLY NOW</button>
                </div>
            </div>
        </section>
        </div>
    );
};

export default HomePage;
