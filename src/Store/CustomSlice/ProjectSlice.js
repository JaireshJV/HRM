import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {

    addprojects: [],
    nonAssignedProjects: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getProject = createAsyncThunk(
    "Project /Get",
    async () => {
        try {
            const response = await request.get('project/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

//method to get the non-assigned projects
export const getNonAssginedProject = createAsyncThunk(
    "NonAssignedProjects /Get",
    async () => {
        try {
            const response = await request.get('project/show');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const ProjectReducer = createSlice({
    name: 'addproject',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            .addCase(getProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.addprojects = action.payload;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // non assigned projects
            .addCase(getNonAssginedProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getNonAssginedProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.nonAssignedProjects = action.payload;
            })
            .addCase(getNonAssginedProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })


    }
})

export const selectAllProjects = (state) => state.addprojects.addprojects
export const getProjectsStatus = (state) => state.addprojects.status
export const getProjectsError = (state) => state.addprojects.error
// non assigned projects
export const selectNonAssignedProjects = (state) => state.addprojects.nonAssignedProjects


export const { reducer } = ProjectReducer;

export default ProjectReducer.reducer

