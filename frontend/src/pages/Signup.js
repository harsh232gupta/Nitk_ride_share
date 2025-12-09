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
        const { name, email, password, gender } = signupInfo;

        // Email domain check
        if (!email.endsWith('@nitk.edu.in')) {
            return handleError('Email must be from @nitk.edu.in domain');
        }

        // Required fields EXCEPT phone, telegram
        if (!name || !email || !password || !gender) {
            return handleError('Name, Email, Password and Gender are required');
        }

        // Remove empty optional values before sending
        const payload = { ...signupInfo };
        if (payload.phone.trim() === '') delete payload.phone;
        if (payload.telegram.trim() === '') delete payload.telegram;

        try {
            const url = `https://nitk-rideshare-1.onrender.com/auth/signup`;  // <-- FIXED
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error?.details?.[0]?.message || result.message);
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
                    <label>Name</label>
                    <input type='text' name='name' value={signupInfo.name} onChange={handleChange} required />
                </div>

                <div>
                    <label>Email</label>
                    <input type='email' name='email' value={signupInfo.email} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={signupInfo.password} onChange={handleChange} required />
                </div>

                <div>
                    <label>Gender</label>
                    <select name='gender' value={signupInfo.gender} onChange={handleChange} required>
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                <div>
                    <label>Phone Number (Optional)</label>
                    <input type='tel' name='phone' value={signupInfo.phone} onChange={handleChange} />
                </div>

                <div>
                    <label>Telegram (Optional)</label>
                    <input type='text' name='telegram' value={signupInfo.telegram} onChange={handleChange} placeholder='Your Telegram ID' />
                </div>

                <button type='submit'>Signup</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>

            <ToastContainer />
        </div>
    );
}

export default Signup;
