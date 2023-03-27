import {configureStore} from "@reduxjs/toolkit";
import carSlice from "./features/car/carSlice";

const store = configureStore({
    reducer: {
        car: carSlice
    }
});

export default store;