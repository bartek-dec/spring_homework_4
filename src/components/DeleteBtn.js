import React from 'react';

const DeleteBtn = ({text, handleClick}) => {
    return (
        <button type='submit' className='btn delete-btn' onClick={handleClick}>
            {text}
        </button>
    );
};

export default DeleteBtn;