import React from 'react';
import {SelectInput} from "./index";
import colors from "../utils/colors";
import {useSelector, useDispatch} from "react-redux";
import {handleCarChange, getCars} from "../features/car/carSlice";

const Filter = () => {
    const options = ['All', ...colors];
    const {filter} = useSelector((state) => state.car);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleCarChange({name, value}));
        dispatch(getCars({filter: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <SelectInput name='filter' value={filter} placeholder='Filter by color:' handleChange={handleChange}
                         options={options}/>
        </form>
    );
};

export default Filter;