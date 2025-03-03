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



interface IProduct {
    id: number,
    nome: string,
    valor: number,
    descricao: string,
    imagem: string
}


const Products = () => {



    const history = useHistory();
    const [products, setProducts] = useState<IProduct[]>([])
    const [token, setToken] = useState("")


    useEffect(() => {
        const tokenJSON = localStorage.getItem('token');
        const isToken = tokenJSON ? JSON.parse(tokenJSON) : '';
        setToken(isToken)
    }, [])

    useEffect(() => {
        if(token)  loadProducts()
    }, [token])

    const loadProducts = async () => {
        const response = await api.get('/produtos')
        setProducts(response.data)
    }

    async function deleteProduct(id: number) {
        const response = await api.delete(`/produtos/${id}`)
        loadProducts()

    }


    // Função que cria um produto
    function newProduct() {
        history.push('/produtos_cadastro')
    }

    function editProduct(id: number) {
        history.push(`/produtos_cadastro/${id}`)
    }


    const renderErrorLog = (
        <>
            <h1 className="erroLogin" >Erro de login!</h1>
            <h2 className="erroLogin" >Por favor,realizar o login!</h2>
            <Error />
        </>
    )



    // Retorna uma tabela com os produtos.

    const renderProduct = (
        <>
            <Header title="Produtos" />
            <div className="containerProd">
                <br />
                <div className="product-header">
                    <h1>Produtos</h1>
                    <Button variant="dark" size="sm" onClick={newProduct} >Novo Produto</Button>
                </div>
                <br />
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Imagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nome}</td>
                                    <td>{product.valor}</td>
                                    <td>{product.descricao}</td>
                                    <td>
                                        <img
                                            src={product.imagem}
                                            alt={product.nome}
                                            className="imgProductList"
                                        />
                                    </td>
                                    <td>
                                        <Button variant="outline-primary" className="btn-alt" size="sm" onClick={() => editProduct(product.id)}><FaPencilAlt className="iconAlt" /></Button>{' '}
                                        <Button variant="outline-danger" className="btn-del" size="sm" onClick={() => deleteProduct(product.id)}><MdDeleteForever className="iconDel" /></Button>{' '}
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
        token ? renderProduct : renderErrorLog
    )

}

export { Products }