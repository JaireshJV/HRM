import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    payroll: [],
    payrolltype: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}


export const getPayroll = createAsyncThunk(
    "payroll/Get",
    async () => {
        try {
            const response = await request.get('payrolldetails/show');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getPayrollType = createAsyncThunk(
    "PaymentType/Get",
    async () => {
        try {
            const response = await request.get('PaymentType');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const EmployeePayrollReducer = createSlice({
    name: 'employeepayroll',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Payroll

            .addCase(getPayroll.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPayroll.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.payroll = action.payload;
            })
            .addCase(getPayroll.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })


            // Payroll Type

            .addCase(getPayrollType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPayrollType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.payrolltype = action.payload;
            })
            .addCase(getPayrollType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// Payroll

export const selectAllPayroll = (state) => state.employeepayroll.payroll
export const getPayrollStatus = (state) => state.employeepayroll.status
export const getPayrollError = (state) => state.employeepayroll.error

// Payroll Type

export const SelectAllPayrollType = (state) => state.employeepayroll.payrolltype
export const getPayrolltypeStatus = (state) => state.employeepayroll.status
export const getPayrolltypeError = (state) => state.employeepayroll.error

export const { reducer } = EmployeePayrollReducer;

export default EmployeePayrollReducer.reducer


