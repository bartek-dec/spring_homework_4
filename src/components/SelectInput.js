import React from 'react';

const SelectInput = ({name, value, handleChange, options, placeholder}) => {
    return (
        <div className='input'>
            <label htmlFor={name}>{placeholder ? placeholder : name}</label>
            <select name={name} value={value} onChange={handleChange}>
                {options.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
        </div>
    );
};

export default SelectInput;