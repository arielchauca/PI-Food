import React from 'react';
import style from './Paginado.module.css';

function Paginado({recipes, page }){
    
    const pageNumber = []

    for(let i = 0; i < Math.ceil(recipes/9); i++){
        pageNumber.push(i+1)
    }

    return(<div className={style.contenedor}>
        {pageNumber && pageNumber.map((number, i) => (
                <button className={style.btn} key={i} onClick={() => page(number)}>{number}</button>
        ))}
    </div>)
};

export default Paginado;