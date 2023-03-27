import {TextInput, SelectInput, SubmitBtn, DeleteBtn} from './index';
import {useSelector, useDispatch} from "react-redux";
import {handleCarChange, closeModal, createCar, deleteCar, updateCar} from "../features/car/carSlice";
import {useState} from "react";
import colors from "../utils/colors";

const Form = () => {
    const {isModalVisible, isEditing, id, brand, model, color} = useSelector((state) => state.car);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleCarChange({name, value}));
    }

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeModal());
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (brand.length < 1 || model.length < 1) {
            setIsError(true);
            return;
        }

        if (isEditing) {
            setIsError(false);
            dispatch(updateCar({id, brand, model, color}));
            return;
        }
        setIsError(false);
        dispatch(createCar({brand, model, color}));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCar(id));
    }

    return (
        <div className={isModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form'>
                <h2>{isEditing ? 'Edit Car' : 'Add new Car'}</h2>

                {isError && <h3 className='error'>Please fill in all fields</h3>}

                <TextInput name='brand' value={brand} handleChange={handleChange}/>
                <TextInput name='model' value={model} handleChange={handleChange}/>
                <SelectInput name='color' value={color} handleChange={handleChange} options={colors}/>

                {isEditing ?
                    <div className='btn-container'>
                        <DeleteBtn text={'Delete'} handleClick={handleDelete}/>
                        <SubmitBtn text={'Submit'} handleClick={handleSubmit}/>
                    </div>
                    :
                    <SubmitBtn text={'Submit'} handleClick={handleSubmit}/>
                }
            </form>
        </div>
    );

};

export default Form;