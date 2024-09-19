import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
  const Navigate = new useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
            localStorage.setItem('token', response.data.token);
            // alert('Login Successful!');
          Navigate('/welcome');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
                
                <button type="submit">Login</button>
                <p>Not an user? <a href="/"> Register here</a></p>
            </form>
        </div>
    );
}

export default Login;
