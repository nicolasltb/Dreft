import axios from "axios";
import React, { useState } from "react";
import './stylesLogin.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/login-user', {
        userData: {
          email,
          password: pass
        }
      });
      if (response.status === 201) {
        window.location.href = "/home";
      } else {
        setEmail("");
        setPass("");
      }
    } catch (error) {
      setEmail("");
      setPass("");
      console.error(error);
    }
  };

  return (
    <div className="wrapper-tudo">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="seuemail@gmail.com"
            id="email"
            name="email"
            style={{ color: 'black' }}
          />
          <label htmlFor="password">Senha</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            style={{ color: 'black' }}
          />
          <button className="buttonAuth" type="submit">Log In</button>
        </form>
        <a href="/register">
          <button
            className="link-btn"
          >
            Não tem uma conta? Registre aqui.
          </button>
        </a>

      </div>
    </div>

  );
};

export default Login;
