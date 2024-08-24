import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    formtype: [],
    customer: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getFormtype = createAsyncThunk(
    "Formtype /Get",
    async () => {
        try {
            const response = await request.get('formrypes');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getCustomer = createAsyncThunk(
    "Customer /Get",
    async () => {
        try {
            const response = await request.get('customers/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const CustomerReducer = createSlice({
    name: 'customer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // ========= Formtype =========== //

            .addCase(getFormtype.pending, (state, action) => {              
                state.status = 'loading'
            })
            .addCase(getFormtype.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.formtype = action.payload;  
            })
            .addCase(getFormtype.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // ========= Customer =========== //
            
            .addCase(getCustomer.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.customer = action.payload;
            })
            .addCase(getCustomer.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export const selectAllFormtype = (state) => state.customer.formtype
export const getFormTypeStatus = (state) => state.customer.status
export const getFormTypeError = (state) => state.customer.error

export const selectAllCustomer = (state) => state.customer.customer
export const getCustomerStatus = (state) => state.customer.status
export const getCustomerError = (state) => state.customer.error

export const { reducer } = CustomerReducer;

export default CustomerReducer.reducer

