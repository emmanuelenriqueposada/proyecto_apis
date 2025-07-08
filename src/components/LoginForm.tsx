import React, { useState } from 'react';
import '../assets/LoginForm.css';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('dicki.alexa@example.org'); 
  const [password, setPassword] = useState('$2y$12$uYSt7J5Zwqho9cUpTkWCW.I4OVojaUjwxHMBZs4DBc48xvH.6Rnxa');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Log in</h2>

        <label className="login-label">Mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
