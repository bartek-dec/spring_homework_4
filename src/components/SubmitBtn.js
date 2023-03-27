import React from 'react';

const SubmitBtn = ({text, handleClick}) => {
    return (
        <button type='submit' className='btn submit-btn' onClick={handleClick}>
            {text}
        </button>
    );
};

export default SubmitBtn;