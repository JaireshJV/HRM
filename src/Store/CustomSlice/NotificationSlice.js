import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    notification: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}


export const getNotification = createAsyncThunk(
    "notification/Get",
    async () => {
        try {
            const response = await request.get('birthday');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const NotificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Notification

            .addCase(getNotification.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getNotification.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.notification = action.payload;
            })
            .addCase(getNotification.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

        



           
    }
})

// Notification

export const selectAllNotification = (state) => state.notification.notification
export const getNotificationStatus = (state) => state.notification.status
export const getNotificationError = (state) => state.notification.error








export const { reducer } = NotificationReducer;

export default NotificationReducer.reducer


