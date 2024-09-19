import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/user/register', { email, password });
            alert('Registration Successful!');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

            <h2>Register</h2>
           

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>

                <p>Already an User? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
}

export default Register;
