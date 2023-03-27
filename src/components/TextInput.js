import React from 'react';

const TextInput = ({name, value, handleChange}) => {
    return (
        <div className='input'>
            <label htmlFor={name}>{name}</label>
            <input type='text' name={name} value={value} onChange={handleChange}/>
        </div>
    );
};

export default TextInput;