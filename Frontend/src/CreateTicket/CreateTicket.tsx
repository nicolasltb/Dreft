import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import './stylesCT.css';

const CreateTicket: React.FC = () => {
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('1');

  const handleAssuntoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssunto(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(event.target.value);
  };

  const handlePrioridadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioridade(event.target.value);
  };

  const handleCriarTicketClick = async () => {
    try {

      if(!assunto || !descricao) {
        return;
      }

      const response = await axios.post('http://localhost:3001/api/v1/create-ticket', {
        ticketData: {
          subject: assunto,
          description: descricao,
          priority: parseInt(prioridade),
          status: 1
        }
      }
      );
      if (response.status === 201) {
        window.location.href = "/home";
      } else {
        setAssunto("");
        setDescricao("");
        setPrioridade('1');
      }
    } catch (error) {
      setAssunto("");
      setDescricao("");
      setPrioridade('1');
    };
  }

  return (
    <div className="app-container">
      <a className="back-icon" href='/home'>
        <FiArrowLeft />
      </a>
      <h1>Adicionar Ticket</h1>
      <div className="form-container">
        <label htmlFor="assunto">Assunto:</label>
        <input
          type="text"
          id="assunto"
          value={assunto}
          onChange={handleAssuntoChange}
          className="input-large"
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={handleDescricaoChange}
          className="input-large"
        />

        <label htmlFor="prioridade">Prioridade:</label>
        <select id="prioridade" value={prioridade} onChange={handlePrioridadeChange}>
          <option value="1">Baixa</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
          <option value="4">Urgente</option>
        </select>

        <button onClick={handleCriarTicketClick}>Criar Ticket</button>
      </div>
    </div>
  );
};

export default CreateTicket;