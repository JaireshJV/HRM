import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    assest: [],
    brandtype: [],
    keyboardtype: [],
    mousetype: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}


export const getAssest = createAsyncThunk(
    "assest/Get",
    async () => {
        try {
            const response = await request.get('assestdetails/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getBrandType = createAsyncThunk(
    "brandtype/Get",
    async () => {
        try {
            const response = await request.get('Brand');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getKeyboardType = createAsyncThunk(
    "keyboardtype/Get",
    async () => {
        try {
            const response = await request.get('KeyboardBrand');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


export const getMouseType = createAsyncThunk(
    "MouseBrand/Get",
    async () => {
        try {
            const response = await request.get('MouseBrand');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);






const AssestReducer = createSlice({
    name: 'assests',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Assest

            .addCase(getAssest.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAssest.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assest = action.payload;
            })
            .addCase(getAssest.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add Brand Type

            .addCase(getBrandType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBrandType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.brandtype = action.payload;
            })
            .addCase(getBrandType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

             // Add KeyBoard Type

             .addCase(getKeyboardType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getKeyboardType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.keyboardtype = action.payload;
            })
            .addCase(getKeyboardType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

             // Add Mouse Type

             .addCase(getMouseType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMouseType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.mousetype = action.payload;
            })
            .addCase(getMouseType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })



           
    }
})

// Assest

export const selectAllAssest = (state) => state.assests.assest
export const getAssestStatus = (state) => state.assests.status
export const getAssestError = (state) => state.assests.error

// Brand Type

export const selectAllBrandType = (state) => state.assests.brandtype
export const selectAllBrandStatus = (state) => state.assests.status
export const selectAllBrandError = (state) => state.assests.error

// KeyBoard Type

export const selectAllKeyBoardType = (state) => state.assests.keyboardtype
export const selectAllKeyBoardStatus = (state) => state.assests.status
export const selectAllKeyBoardError = (state) => state.assests.error

// Mouse Type

export const selectAllMouseType = (state) => state.assests.mousetype
export const selectAllMouseStatus = (state) => state.assests.status
export const selectAllMouseError = (state) => state.assests.error







export const { reducer } = AssestReducer;

export default AssestReducer.reducer


