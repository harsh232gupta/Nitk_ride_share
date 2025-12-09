import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        telegram: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, gender, phone, comments } = signupInfo;

        // Email validation to check if it ends with @nitk.edu.in
        if (!email.endsWith('@nitk.edu.in')) {
            return handleError('Email must be from @nitk.edu.in domain');
        }

        if (!name || !email || !password || !gender || !phone) {
            return handleError('All fields except comments are required');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error?.details[0].message || result.message);
            }
        } catch (err) {
            handleError('Signup failed, please try again later.');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={signupInfo.name} onChange={handleChange} placeholder='Enter your name...' autoFocus required />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={signupInfo.email} onChange={handleChange} placeholder='Enter your email...' required />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={signupInfo.password} onChange={handleChange} placeholder='Enter your password...' required />
                </div>
                <div>
                    <label htmlFor='gender'>Gender</label>
                    <select name='gender' value={signupInfo.gender} onChange={handleChange} required>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='phone'>Phone Number</label>
                    <input type='tel' name='phone' value={signupInfo.phone} onChange={handleChange} placeholder='Enter your phone number...' required />
                </div>
                <div>
                    <label htmlFor='comments'>Additional Comments (Optional)</label>
                    <textarea name='comments' value={signupInfo.comments} onChange={handleChange} placeholder='Any additional comments...'></textarea>
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
