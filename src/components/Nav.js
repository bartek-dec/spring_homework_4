import {AddCarBtn, Filter} from '../components';
import {useSelector} from "react-redux";

const Nav = () => {
    const {cars} = useSelector((state) => state.car);

    return (
        <nav className="nav center">
            <div className='heading'>
                <h2>Car rental</h2>
                <h4>There {cars.length === 1 ? 'is' : 'are'} {cars.length} {cars.length === 1 ? 'car' : 'cars'} available</h4>
            </div>
            <div className='nav-container'>
                <div className='filter'>
                    <Filter/>
                </div>
                <AddCarBtn/>
            </div>
        </nav>
    );
};

export default Nav;