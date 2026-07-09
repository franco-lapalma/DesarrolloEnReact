import React from 'react';
import './Tarjeta.css';

function Tarjeta({ nombre, profesion, imagen, descripcion }) {
    return (
        <article className="tarjeta">
            <img src={imagen} alt={`Foto de ${nombre}`} className="tarjeta-imagen" />
            <h2 className="tarjeta-nombre">{nombre}</h2>
            <h3 className="tarjeta-profesion">{profesion}</h3>
            <p className="tarjeta-descripcion">{descripcion}</p>
        </article>
    );
}

export default Tarjeta;
