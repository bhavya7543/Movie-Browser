import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // if (email !== 'bhavya7543@gmail.com' || password !== '123456') {
    //   //setError('Only specific email is allowed');
    //   return;
    // }

    setError('');

    if (onLogin) {
      onLogin(email);
    }

    navigate('/');
  }

  return (
    <div className="container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;