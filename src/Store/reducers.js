import { combineReducers } from "redux"
import authReducer from '../modules/Auth/authSlice'
import CompanyReducer from "./CustomSlice/CompanySlice";
import TrainingReducer from "./CustomSlice/TrainingSlice";
import EmployeeReducer from "./CustomSlice/EmployeeSlice";
import CustomerReducer from "./CustomSlice/CustomerSlice"
import SecondemployeeReducer from "./CustomSlice/SecondemployeeSlice"
import EmployeePayrollReducer from './CustomSlice/PayrollSlice'
import ProjectReducer from "./CustomSlice/ProjectSlice"
import AssestReducer from './CustomSlice/AssestSlice'
import TimeSheetReducer from './CustomSlice/TimeSheetSlice'
import NotificationReducer from './CustomSlice/NotificationSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    company: CompanyReducer,
    training: TrainingReducer,
    employee: EmployeeReducer,
    customer: CustomerReducer,
    secondemployee: SecondemployeeReducer,
    employeepayroll: EmployeePayrollReducer,
    addprojects: ProjectReducer,
    assests: AssestReducer,
    timesheet: TimeSheetReducer,
    notification:NotificationReducer

})

export default rootReducer;