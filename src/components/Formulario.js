import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer; 
    }

`;

const Formulario = ( {guardarMoneda, guardarCriptomoneda} ) => {

    //State del listado de criptomonedas
    const [ listacripto, guardarcripto] = useState([]);

    const [error, guardarError] = useState(false);
    

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'CLP', nombre: 'Pesos Chilenos' },
        { codigo: 'ARG', nombre: 'Pesos Argentinos' },
        { codigo: 'EUR', nombre: 'Euros' },
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    //Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarcripto(resultado.data.Data);
        }
        consultarAPI();
    }, [])


    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar campos llenos
        if( moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //Pasar datos al ocmponente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />
            <SelectCripto />
            
            <Boton 
                type="submit"
                value="Calcular"
            />

        </form>
     );
}
 
export default Formulario;