import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    company: [],
    expense: [],
    expensetype: [],
    announcement: [],
    resignation:[],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

// getCompany
export const getCompany = createAsyncThunk(
    "Company/Get",
    async () => {
        try {
            const response = await request.get('company');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


//getExpense

export const getExpense = createAsyncThunk(
    "Expense/Get",
    async () => {
        try {
            const response = await request.get('expensedetails/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);






//getExpenseType
export const getExpenseType = createAsyncThunk(
    "Expensetype/Get",
    async () => {
        try {
            const response = await request.get('expensetype');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


export const getAnnouncement = createAsyncThunk(
    "Announcement/Get",
    async () => {
        try {
            const response = await request.get('announcementdetails/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const CompanyReducer = createSlice({
    name: 'company',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompany.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.company = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(getAnnouncement.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAnnouncement.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.announcement = action.payload;
            })
            .addCase(getAnnouncement.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(getExpenseType.pending, (state, action) => {
                state.status = 'loading'
                state.expensetype = action.payload;
            })
            .addCase(getExpenseType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.expensetype = action.payload;
            })
            .addCase(getExpenseType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            .addCase(getExpense.pending, (state, action) => {
                state.status = 'loading'
                state.expense = action.payload;
            })
            .addCase(getExpense.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.expense = action.payload;
            })
            .addCase(getExpense.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
         

    }
})

export const selectAllCompany = (state) => state.company.company
export const getCompanyStatus = (state) => state.company.status
export const getCompanyError = (state) => state.company.error
export const selectAllAnnouncement = (state) => state.company.announcement
export const getAnnouncementStatus = (state) => state.company.status
export const getAnnouncementError = (state) => state.company.error
export const selectAllExpenseType = (state) => state.company.expensetype
export const getExpenseTypeStatus = (state) => state.company.status
export const getExpenseTypeError = (state) => state.company.error
export const selectAllExpense = (state) => state.company.expense
export const getExpenseStatus = (state) => state.company.status
export const getExpenseError = (state) => state.company.error

export const { reducer } = CompanyReducer;

export default CompanyReducer.reducer

