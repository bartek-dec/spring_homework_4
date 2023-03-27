import React from 'react';
import {Nav, Car, Form} from '../components';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCars, editCar} from "../features/car/carSlice";

const LandingPage = () => {
    const {cars, msg} = useSelector((state) => state.car);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCars());
        // eslint-disable-next-line
    }, []);

    const handleClick = (car) => {
        dispatch(editCar(car));
    }

    return (
        <section className='page'>
            <Form/>
            <Nav/>
            <section className='cars-container center'>
                {msg && <h2 className='error'>{msg}</h2>}

                {cars.map((item) => {
                    const {id, brand, model, color} = item;
                    return <Car key={id} brand={brand} model={model} color={color}
                                handleClick={() => handleClick({id, brand, model, color})}/>
                })}
            </section>
        </section>
    );
};

export default LandingPage;