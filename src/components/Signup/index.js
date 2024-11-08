import { useState } from 'react';
import { IoMdContact } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlineScreenLockPortrait } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; // useNavigate hook
import { Link } from 'react-router-dom'; // Add this import for Link
import './index.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    const onSubmitFailure = (message) => {
        setShowSubmitError(true);
        setErrorMessage(message);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://loan-backend-8.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/login'); // Use navigate instead of this.props.history.push
            } else {
                onSubmitFailure(data.message);
            }
        } catch (error) {
            onSubmitFailure('An unexpected error occurred.');
        }
    };

    const renderPasswordField = () => (
        <>
            <label className='input-label' htmlFor='password'>PASSWORD</label>
            <div className='input-contain'>
                <MdOutlineScreenLockPortrait className='icon' />
                <input
                    type='password'
                    id='password'
                    className='input-field'
                    value={password}
                    onChange={onChangePassword}
                    placeholder='Create Password'
                    required
                />
            </div>
        </>
    );

    const renderUsernameField = () => (
        <>
            <label className='input-label' htmlFor='username'>USERNAME</label>
            <div className='input-contain'>
                <IoMdContact className='icon' />
                <input
                    type='text'
                    id='username'
                    className='input-field'
                    value={username}
                    onChange={onChangeUsername}
                    placeholder='Create Username'
                    required
                />
            </div>
        </>
    );

    const renderEmailField = () => (
        <>
            <label className='input-label' htmlFor='email'>Email</label>
            <div className='input-contain'>
                <MdMarkEmailRead className='icon' />
                <input
                    type='email'
                    id='email'
                    className='input-field'
                    value={email}
                    onChange={onChangeEmail}
                    placeholder='Your e-mail'
                    required
                />
            </div>
        </>
    );

    return (
        <div className='login-form-container'>
            <form className='form-container' onSubmit={onSubmitForm}>
                <img src='https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg'
                    className='login-website-logo-desktop-img image-logo'
                    alt='website logo'
                />
                <div className='card'>
                    <h1>Welcome!</h1>
                    <div className='input-container'>{renderUsernameField()}</div>
                    <div className='input-container'>{renderEmailField()}</div>
                    <div className='input-container'>{renderPasswordField()}</div>
                    <button className='signup-button' type='submit'>Sign Up</button>
                    {showSubmitError && <p className='error' aria-live="assertive">{errorMessage}</p>}
                    
                    {/* Link to Login page */}
                    <p className='login-option'>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
