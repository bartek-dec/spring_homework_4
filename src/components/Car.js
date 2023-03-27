import React from 'react';

const Car = ({brand, model, color, handleClick}) => {
    return (
        <article className='car' onClick={handleClick}>
            <section className='brand'>{brand}</section>
            <section className='model'>{model}</section>
            <section className='color'>{color}</section>
        </article>
    );
};

export default Car;