import { FaPencilAlt } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { Table, Button } from 'react-bootstrap';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Error from '../../components/ErrorLogin';
import api from "../../Service/api";

import './styles.css'



interface ICliente {
    id: number,
    nome: string,
    endereco: string,
    telefone: number,
}


const Clientes = () => {

    const history = useHistory();
    const [cliente, setCliente] = useState<ICliente[]>([])
    const [token, setToken] = useState("")

    useEffect(() => {
        const tokenJSON = localStorage.getItem('token');
        const isToken = tokenJSON ? JSON.parse(tokenJSON) : '';
        setToken(isToken)
    }, [])

    useEffect(() => {
        if(token) loadCliente()
    }, [token])


    async function loadCliente() {

        const response = await api.get('/clientes')
        setCliente(response.data)
    }

    async function deleteCliente(id: number) {
        const response = await api.delete(`/clientes/${id}`)
        loadCliente()
    }

    // Função que cria um cliente
    const newCliente = () => {
        history.push('/clientes_cadastro')
    }

    const editCliente = (id: number) => {
        history.push(`/clientes_cadastro/${id}`)
    }


    const renderErrorLog = (
        <>
            <h1 className="erroLogin" >Erro de login!</h1>
            <h2 className="erroLogin" >Por favor,realizar o login!</h2>
            <Error />
        </>
    )

    // Retorna uma tabela com os Clientes.

    const renderCliente = (
        <>
            <Header title="Clientes" />
            <div className="containerCliente">
                <br />
                <div className="cliente-header">
                    <h1>Clientes</h1>
                    <Button variant="dark" size="sm" onClick={newCliente}>Novo Cliente</Button>
                </div>
                <br />
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereco</th>
                            <th>Tel</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cliente.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.endereco}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>
                                        <Button variant="outline-primary" className="btn-alt" size="sm" onClick={() => editCliente(cliente.id)}><FaPencilAlt className="iconAlt" /></Button>
                                        <Button variant="outline-danger" className="btn-del" size="sm" onClick={() => deleteCliente(cliente.id)}><MdDeleteForever className="iconDel" /></Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <Footer />
        </>
    );

    return (
        token ? renderCliente : renderErrorLog
    )

}

export { Clientes }