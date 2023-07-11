import React, { ReactNode, useEffect, useState } from "react";
import './stylesModal.css';
import axios from "axios";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: (e: any) => void;
}

interface Data {
    id: number;
    subject: string;
    description: string;
    status: number;
    priority: number;
    agent_id: number;
    created_at: string;
    updated_at: string;
}

export default function Modal(props: ModalType) {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        if (props.isOpen) {
            fetchData();
        }
    }, [props.isOpen]);

    const fetchData = async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/v1/read-ticket?id=1`);
            setData(response.data.data);
        } catch (error) {
            console.error("Erro ao obter os dados do backend:", error);
        }
    };

    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay" onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className="modal-box">
                        {data ? (
                            <>
                                <h2>Assunto: {data.subject}</h2>
                                <p>Descricao: {data.description}</p>
                                <p>Status: {data.status}</p>
                                <p>Prioridade: {data.priority}</p>
                                <p>Data de Criacao: {data.created_at}</p>
                                <p>Ultima Atualizacao: {data.updated_at}</p>
                            </>
                        ) : (
                            <p>Carregando...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}