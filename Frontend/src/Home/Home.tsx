import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stylesHome.css';
import { FiArrowLeft } from 'react-icons/fi';
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

type Ticket = {
  id: number;
  subject: string;
  created_at: string;
  updated_at: string;
  priority: number;
  status: string;
};

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3001/api/v1/read-ticket')
      .then((response) => {
        setTickets(response.data.data);
        setLoading(false);
      })
  };

  const handleAdicionarTicketClick = () => {
    
  }

  return (
    <>
    {loading ? (
        <div>...Data Loading.....</div>
      ) : <div className="app-container">
        <a className="back-icon" href='/'>
        <FiArrowLeft />
      </a>
      <h1 id='tituloH1'>Lista de Tickets</h1>
      <div className="form-container">
        <a href="/createTicket">
          <button id='botao' onClick={handleAdicionarTicketClick}>Adicionar Ticket</button>
        </a>
      </div>
      <table className="tickets-table">
        <thead>
          <tr className='trA'>
            <th className='thA'>ID</th>
            <th className='thA'>Assunto</th>
            <th className='thA'>Data de Criação</th>
            <th className='thA'>Última Atualização</th>
            <th className='thA'>Prioridade</th>
            <th className='thA'>Status</th>
          </tr>
        </thead>
        <tbody id='tbodyA'>
          {tickets.length > 0 && tickets.map((ticket) => (
            <tr onClick={toggle} className='trA' key={ticket.id}>
              <td className='tdA'>{ticket.id}</td>
              <td className='tdA'>{ticket.subject}</td>
              <td className='tdA'>{ticket.created_at}</td>
              <td className='tdA'>{ticket.updated_at}</td>
              <td className='tdA'>{ticket.priority}</td>
              <td className='tdA'>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isOpen} toggle={toggle}></Modal>
    </div>}
    </> 
  );
};

export default Home;
