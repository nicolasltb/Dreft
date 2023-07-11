import axios from "axios";
import React, { useState } from "react";
//import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userType, setUserType] = useState<string>("AGENT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(userType)
      const response = await axios.post('http://localhost:3001/api/v1/create-user', {
        userData: {
          name,
          email,
          password: pass,
          type: userType
        }
      });

      if (response.status === 201) {
        window.location.href = "/";
      } else {
        setName("");
        setEmail("");
        setPass("");
        setUserType("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper-tudo">
      <div className="auth-form-container">
        <h2>Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <br/>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Joazinho Fulano"
            id="name"
            name="name"
            style={{ color: 'black' }}
          />
          <br/><br/>
          <label htmlFor="email">Email</label>
          <br/>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@gmail.com"
            id="email"
            name="email"
            style={{ color: 'black' }}
          />
          <br/><br/>
          <label htmlFor="password">Senha</label>
          <br/>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            style={{ color: 'black' }}
          />
          <br/>
          <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
            <label className="radio-container">
              <input className="tipoUsuario"
                type="radio"
                value="AGENT"
                checked={userType === "AGENT"}
                onChange={(e) => setUserType(e.target.value)}
              />
              Analista
            </label>
            <label className="radio-container" >
              <input
                type="radio"
                value="CUSTOMER"
                checked={userType === "CUSTOMER"}
                onChange={(e) => setUserType(e.target.value)}
              />
              Cliente
            </label>
          </div>

          <button className="buttonAuth" type="submit">Registrar</button>
        </form>
        <a href="/">
          <button
            className="link-btn"
          >
            Já tem uma conta? Faça login aqui.
          </button>
        </a>

      </div>
    </div>

  );
};

export default Register;
