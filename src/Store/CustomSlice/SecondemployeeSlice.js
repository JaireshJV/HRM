import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    termination: [],
    leave:[],
    leavetype: [],
    emergencycontact: [],
    emergencycontacttype: [],
    exitemployee: [],
    projectwork: [],
    projectreport: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getTermination = createAsyncThunk(
    "Termination/Get",
    async () => {
        try {
            const response = await request.get('terminations/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getLeave = createAsyncThunk(
    "Leave/Get",
    async () => {
        try {
            const response = await request.get('employeeleave/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);


export const getLeaveType = createAsyncThunk(
    "LeaveType/Get",
    async () => {
        try {
            const response = await request.get('LeaveType');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getEmergencyContact = createAsyncThunk(
    "EmergencyContact/Get",
    async () => {
        try {
            const response = await request.get('emergencycontacts/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getEmergencyType = createAsyncThunk(
    "EmergencyType/Get",
    async () => {
        try {
            const response = await request.get('relationtype');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getExit = createAsyncThunk(
    "Exit/Get",
    async () => {
        try {
            const response = await request.get('employeeexit/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getProjectWork = createAsyncThunk(
    "projectwork/view",
    async () => {
        try {
            const response = await request.get('projectwork/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
            
        }
    }
);

export const getProjectReport = createAsyncThunk(
    "projectreport/view",
    async () => {
        try {
            const response = await request.get('projectreport/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
            
        }
    }
);


const SecondemployeeReducer = createSlice({
    name: 'secondemployee',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Termination

            .addCase(getTermination.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTermination.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.termination = action.payload;
            })
            .addCase(getTermination.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Employee Leave

            .addCase(getLeave.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getLeave.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.leave = action.payload;
            })
            .addCase(getLeave.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Employee LeaveType

            .addCase(getLeaveType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getLeaveType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.leavetype = action.payload;
            })
            .addCase(getLeaveType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // EmergencyContacts 

            .addCase(getEmergencyContact.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getEmergencyContact.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.emergencycontact = action.payload;
            })
            .addCase(getEmergencyContact.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // EmergencyContacts Type

            .addCase(getEmergencyType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getEmergencyType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.emergencycontacttype = action.payload;
            })
            .addCase(getEmergencyType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Exit

            .addCase(getExit.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getExit.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.exitemployee = action.payload;
            })
            .addCase(getExit.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

              // project work

              .addCase(getProjectWork.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProjectWork.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projectwork = action.payload;
            })
            .addCase(getProjectWork.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

             // project Report

             .addCase(getProjectReport.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getProjectReport.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.projectreport = action.payload;
            })
            .addCase(getProjectReport.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// Termination 

export const selectAllTermination = (state) => state.secondemployee.termination
export const getTerminationStatus = (state) => state.secondemployee.status
export const getTerminationError = (state) => state.secondemployee.error

// Leave

export const selectAllLeave = (state) => state.secondemployee.leave
export const getLeaveStatus = (state) => state.secondemployee.status
export const getLeaveError = (state) => state.secondemployee.error

// LeaveType 

export const selectAllLeavetype = (state) => state.secondemployee.leavetype
export const getLeavetypeStatus = (state) => state.secondemployee.status
export const getLeavetypeError = (state) => state.secondemployee.error

// EmergencyContacts 

export const selectAllEmergency = (state) => state.secondemployee.emergencycontact
export const getEmergencyStatus = (state) => state.secondemployee.status
export const getEmergencyError = (state) => state.secondemployee.error

// EmergencyContacts Type

export const selectAllEmergencyType = (state) => state.secondemployee.emergencycontacttype
export const getEmergencytypeStatus = (state) => state.secondemployee.status
export const getEmergencytypeError = (state) => state.secondemployee.error

// Exit

export const selectAllExit = (state) => state.secondemployee.exitemployee
export const getExitStatus = (state) => state.secondemployee.status
export const getExitError = (state) => state.secondemployee.error

// Project Work

export const selectAllProjectWork = (state) => state.secondemployee.projectwork
export const getProjectWorkStatus = (state) => state.secondemployee.status
export const getProjectWorkError = (state) => state.secondemployee.error

// Project report

export const selectAllProjectreport = (state) => state.secondemployee.projectreport
export const getProjectReportStatus = (state) => state.secondemployee.status
export const getProjectreportError = (state) => state.secondemployee.error

export const { reducer } = SecondemployeeReducer;

export default SecondemployeeReducer.reducer


