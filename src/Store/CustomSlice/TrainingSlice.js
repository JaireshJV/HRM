import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    training: [],
    trainingClass: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getTraining = createAsyncThunk(
    "training/Get",
    async () => {
        try {
            const response = await request.get('traineeDetails');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getTrainingClass = createAsyncThunk(
    "traineeClassDetails/Get",
    async () => {
        try {
            const response = await request.get('TraineeClassdetails/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const TrainingReducer = createSlice({
    name: 'training',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

        // trainee
            .addCase(getTraining.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTraining.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.training = action.payload;
            })
            .addCase(getTraining.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // trainee Class 

            .addCase(getTrainingClass.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTrainingClass.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.trainingClass = action.payload;
            })
            .addCase(getTrainingClass.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// trainee

export const selectAllTraining = (state) => state.training.training
export const getTrainingStatus = (state) => state.training.status
export const getTrainingError = (state) => state.training.error

// trainee Class

export const selectAllTrainingClass = (state) => state.training.trainingClass
export const getTrainingStatusClass = (state) => state.training.status
export const getTrainingErrorClass = (state) => state.training.error

export const { reducer } = TrainingReducer;

export default TrainingReducer.reducer


