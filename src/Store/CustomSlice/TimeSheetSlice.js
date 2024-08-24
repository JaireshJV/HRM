import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    attendance: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getAttendance = createAsyncThunk(
    "attendance/Get",
    async () => {
        try {
            const response = await request.get('attendance/date');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


const TimeSheetReducer = createSlice({
    name: 'timesheet',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Attendance

            .addCase(getAttendance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.attendance = action.payload;
            })
            .addCase(getAttendance.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })



    }
})

// Attendance 

export const selectAllAttendance = (state) => state.timesheet.attendance
export const getAttendanceStatus = (state) => state.timesheet.status
export const getAttendanceError = (state) => state.timesheet.error


export const { reducer } = TimeSheetReducer;

export default TimeSheetReducer.reducer


