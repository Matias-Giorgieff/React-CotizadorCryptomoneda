import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInitial, opciones) => {
    // State de neustro custom hook
    const [state, actualizarState] = useState(stateInitial);
    
    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange= { e => actualizarState(e.target.value)}
                value= {state}
            >
                <option value=''>Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    //Retornar state, Interfaz y funcion que modifica el state
    return [state, Seleccionar];
}


export default useMoneda;


