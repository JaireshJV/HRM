import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";


const initialState = {
    allemployees:[],
    employee: [],
    role: [],
    designation: [],
    department:[],
    resignation: [],
    complaints: [],
    transfer: [],
    awards: [],
    promotions: [],
    qualification: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getResignation = createAsyncThunk(
    "resignation/Get",
    async () => {
        try {
            const response = await request.get('resignations/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getComplaint = createAsyncThunk(
    "complaint/Get",
    async () => {
        try {
            const response = await request.get('complaints/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getAllEmployee = createAsyncThunk(
    "employeeview/Get",
    async () => {
        try {
            const response = await request.get('employees/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getEmployee = createAsyncThunk(
    "employeetrue/Get",
    async () => {
        try {
            const response = await request.get('employees/true');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getRole = createAsyncThunk(
    "role/Get",
    async () => {
        try {
            const response = await request.get('role');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getDesignation = createAsyncThunk(
    "designation/Get",
    async () => {
        try {
            const response = await request.get('designation');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getDepartment = createAsyncThunk(
    "department/Get",
    async () => {
        try {
            const response = await request.get('department');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getTransfer = createAsyncThunk(
    "Transfer/Get",
    async () => {
        try {
            const response = await request.get('transfer/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getAwards = createAsyncThunk(
    "Awards/Get",
    async () => {
        try {
            const response = await request.get('photo');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getQualification = createAsyncThunk(
    "Qualifications/Get",
    async () => {
        try {
            const response = await request.get('qualification/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

export const getPromotions = createAsyncThunk(
    "Promotions/Get",
    async () => {
        try {
            const response = await request.get('promotions/view');
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const EmployeeReducer = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        // editEmployee: (state, action) => {
        //     state.employee.map((item) => {
        //         if (item.employee_id === action.payload.employee_id) {
        //             // Update the item properties here
        //             return {
        //                 ...item,...action.payload,
        //                 // Update the properties based on the action payload
        //                 // For example: item.name = action.payload.newName
        //             };
        //         }
        //         return item;
        //     })
        // }
    },
    extraReducers: (builder) => {
        builder

          
            // View Employee

            .addCase(getAllEmployee.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAllEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.allemployees = action.payload;
            })
            .addCase(getAllEmployee.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add Employee

            .addCase(getEmployee.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.employee = action.payload;
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add Role

            .addCase(getRole.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getRole.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.role = action.payload;
            })
            .addCase(getRole.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Add Designation

            .addCase(getDesignation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDesignation.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.designation = action.payload;
            })
            .addCase(getDesignation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            //Add Resignation

            .addCase(getResignation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getResignation.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.resignation = action.payload;
            })
            .addCase(getResignation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

             //Add Department

             .addCase(getDepartment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.department = action.payload;
            })
            .addCase(getDepartment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })


            // Complaints

            .addCase(getComplaint.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getComplaint.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.complaints = action.payload;
            })
            .addCase(getComplaint.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Transfer

            .addCase(getTransfer.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTransfer.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.transfer = action.payload;
            })
            .addCase(getTransfer.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Awards

            .addCase(getAwards.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAwards.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.awards = action.payload;
            })
            .addCase(getAwards.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Quaalification

            .addCase(getQualification.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getQualification.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.qualification = action.payload;
            })
            .addCase(getQualification.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            // Promotions

            .addCase(getPromotions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPromotions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.promotions = action.payload;
            })
            .addCase(getPromotions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// View Employeees

export const SelectViewEmployees = (state) => state.employee.allemployees
export const getViewEmployeeStatus = (state) => state.employee.status
export const getViewEmployeeError = (state) => state.employee.error


// addEmployee

export const selectAllEmployee = (state) => state.employee.employee
export const getEmployeeStatus = (state) => state.employee.status
export const getEmployeeError = (state) => state.employee.error

// Add Role

export const selectAllRole = (state) => state.employee.role
export const getRoleStatus = (state) => state.employee.status
export const getRoleError = (state) => state.employee.error

// Add Designation

export const selectAllDesignation = (state) => state.employee.designation
export const getDesignationStatus = (state) => state.employee.status
export const getDesignationError = (state) => state.employee.error

//Add Resignation

export const selectAllResignation = (state) => state.employee.resignation
export const getResignationStatus = (state) => state.employee.status
export const getResignationError = (state) => state.employee.error

//Add Department

export const selectAllDepartment = (state) => state.employee.department
export const getDepartmentStatus = (state) => state.employee.status
export const getDepartmentError = (state) => state.employee.error

// Complaints

export const selectAllComplaint = (state) => state.employee.complaints
export const getComplaintStatus = (state) => state.employee.status
export const getComplaintError = (state) => state.employee.error

// Transfer

export const selectAllTransfer = (state) => state.employee.transfer
export const getTransferStatus = (state) => state.employee.status
export const getTransferError = (state) => state.employee.error

// Awards

export const selectAllAwards = (state) => state.employee.awards
export const getAwardsStatus = (state) => state.employee.status
export const getAwardsError = (state) => state.employee.error

//Qualification

export const selectAllQualification = (state) => state.employee.qualification
export const getQualificationStatus = (state) => state.employee.status
export const getQualificationError = (state) => state.employee.error

// Promotions

export const selectAllPromotions = (state) => state.employee.promotions
export const getPromotionsStatus = (state) => state.employee.status
export const getPromotionsError = (state) => state.employee.error

export const { reducer } = EmployeeReducer;
// export const { editEmployee } = EmployeeReducer.actions
export default EmployeeReducer.reducer


