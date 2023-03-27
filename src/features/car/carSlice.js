import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import colors from "../../utils/colors";

const url = 'http://localhost:8080/cars';

const initialState = {
    cars: [],
    msg: '',
    isLoading: false,
    isModalVisible: false,
    isEditing: false,
    id: 0,
    brand: '',
    model: '',
    color: colors[0],
    filter: 'All',
}

export const getCars = createAsyncThunk('getCars', async (payload, thunkApi) => {
    try {
        const filter = !payload ? '' : payload.filter;

        if (filter === '' || filter === 'All') {
            const {data} = await axios.get(url);
            return data;
        }

        const {data} = await axios.get(`${url}?color=${filter}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue('Not found.');
    }
});

export const createCar = createAsyncThunk('createCar', async (payload, thunkApi) => {
    try {
        await axios.post(url, payload);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Internal Server Error');
    }
});

export const deleteCar = createAsyncThunk('deleteCar', async (id, thunkApi) => {
    try {
        await axios.delete(`${url}/${id}`);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Not found');
    }
});

export const updateCar = createAsyncThunk('updateCar', async (payload, thunkApi) => {
    try {
        await axios.put(url, payload);
        thunkApi.dispatch(getCars());
    } catch (error) {
        thunkApi.rejectWithValue('Not found');
    }
});

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        handleCarChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        openModal: (state) => {
            state.isModalVisible = true;
        },
        closeModal: (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.id = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
        },
        editCar: (state, action) => {
            const {id, brand, model, color} = action.payload;
            state.isModalVisible = true;
            state.isEditing = true;
            state.id = id;
            state.brand = brand;
            state.model = model;
            state.color = color;
        }
    },
    extraReducers: builder => {
        builder.addCase(getCars.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(getCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cars = action.payload;
        }).addCase(getCars.rejected, (state, action) => {
            state.isLoading = false;
            state.cars = [];
            state.msg = action.payload;
        }).addCase(createCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(createCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.filter = 'All';
        }).addCase(createCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isModalVisible = false;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.filter = 'All';
            state.msg = action.payload;
        }).addCase(deleteCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(deleteCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.id = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.filter = 'All';
        }).addCase(deleteCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isModalVisible = false;
            state.isEditing = false;
            state.id = 0;
            state.brand = '';
            state.model = '';
            state.filter = 'All';
            state.color = colors[0];
            state.msg = action.payload;
        }).addCase(updateCar.pending, (state) => {
            state.isLoading = true;
            state.msg = '';
        }).addCase(updateCar.fulfilled, (state) => {
            state.isModalVisible = false;
            state.isEditing = false;
            state.id = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.filter = 'All';
        }).addCase(updateCar.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.isModalVisible = false;
            state.isEditing = false;
            state.id = 0;
            state.brand = '';
            state.model = '';
            state.color = colors[0];
            state.filter = 'All';
            state.msg = action.payload;
        })
    }
});

export default carSlice.reducer;
export const {handleCarChange, closeModal, openModal, editCar} = carSlice.actions;