import {HiPlusCircle} from 'react-icons/hi';
import {openModal} from "../features/car/carSlice";
import {useDispatch} from "react-redux";

const AddCarBtn = () => {
    const dispatch = useDispatch();

    return (
        <button type='button' className='add-car-btn' onClick={() => dispatch(openModal())}>
            <HiPlusCircle className='btn-icon'/> Add car
        </button>
    );
};

export default AddCarBtn;