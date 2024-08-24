
// import UserSignin from "../../modules/Auth/UserSignin";
import UserSignin from "../components/UserSignIn";
import PageNotFound from "../components/PageNotFound";

//  ============== Dashboard  ================
import { Dashboard } from "../../modules/Dashboard/Dashboard";

//  ============== 1. Company Organization ============= 
import { CompanyProfile } from "../../modules/CompanyOrganization/CompanyProfile"   
import { AnnouncementTableIndex } from "../../modules/CompanyOrganization/CompanyAnnouncements"    
import { ExpenseTableIndex } from "../../modules/CompanyOrganization/CompanyExpense"   

//  ============== 2. Customer and Clients =============    
import { CustomerAndClient } from "../../modules/CustomerAndClient";   

//  ============== 3.  Employees =============   
import { AddEmployee } from "../../modules/Employees/AddEmployee";     
import { EmployeeQualificationAndCertificates } from "../../modules/Employees/EmployeeQualificationAndCertificates";   
import { QualificationAndCertificates } from "../../modules/Employees/Qualifications";  
import { EmployeeAwards } from "../../modules/Employees/EmployeeAwards";   
import { EmployeeTransfer } from "../../modules/Employees/EmployeeTransfer";        
import { EmployeeResignation } from "../../modules/Employees/EmployeeResignation";    
import { EmployeePromotions } from "../../modules/Employees/EmployeePromotions";      
import { EmployeeComplaints } from "../../modules/Employees/EmployeeComplaints"; 
import { EmployeeTerminations } from "../../modules/Employees/EmployeeTerminations";   
import { ProjectWork } from "../../modules/Employees/ProjectWork";   
import { ProjectReport } from "../../modules/Employees/ProjectReport";     
import { EmployeeLeave } from "../../modules/Employees/EmployeeLeave";   
import { EmergencyContacts } from "../../modules/Employees/EmergencyContacts";     
import { EmployeeExit } from "../../modules/Employees/EmployeeExit";       

//  ============== 4. Time Sheet =============    
import { AttendanceIndex } from "../../modules/TimeSheet/Attendance"   
import { UpdateAttendance } from "../../modules/TimeSheet/UpdateAttendance"    
import { ViewAttendance } from "../../modules/TimeSheet/Leave";        

//  ============== 5. Payroll For Employees =============   
import { Payroll } from "../../modules/PayrollForEmployees/Payroll";    
import { ViewPayroll } from "../../modules/PayrollForEmployees/ViewPayroll";  

//  ============== 6. Project =============   
import { AddProject } from "../../modules/Project/AddProject";     

//  ============== 7. Work Sheet ============= 
import { WorksheetTasks } from "../../modules/WorkSheet/WorkSheetTasks"    

//  ============== 8. Training ============= 
import { TraineeDetails } from "../../modules/Training/TraineeDetails";   
import { TraineeClass } from "../../modules/Training/TraineeClass";        


//  ============== 9. Assests ============= 
import { AssestsIndex } from "../../modules/Assests";

//  ============== 10. Reports ============= 

//  ============== 10.1 Company Reports ============= 

import { CompanyReport } from "../../modules/Reports/CompanyReports";        
import { ExpenseReport } from "../../modules/Reports/ReportsProject/Expense";     
import { PayrollRep } from "../../modules/Reports/ReportsProject/Payroll";           
import { PayrollMonth } from "../../modules/Reports/ReportsProject/PayrollByMonth";   
// import { WorkSheetReport } from "../../modules/Reports/ReportsProject/WorksheetRep";         
import { ExpenseByMonthReport } from "../../modules/Reports/ReportsProject/ExpenseByMonth";     
import { ExpenseByYear } from "../../modules/Reports/ReportsProject/ExpenseByYear"; 
import { CurrentExpense } from "../../modules/Reports/ReportsProject/CurrentExpense"; 

//  ============== 10.2 Employee Reports ============= 
import { ComplaintsReport } from "../../modules/Reports/EmployeeReports/ComplaintReports"           
import { ProjectReportEmp } from "../../modules/Reports/EmployeeReports/ProjectReport";       
import { ProjectWorkReport } from "../../modules/Reports/EmployeeReports/ProjectWorkReport";       
import { PromotionReport } from "../../modules/Reports/EmployeeReports/PromotionReports";       
import { ResignationReport } from "../../modules/Reports/EmployeeReports/ResignationReports";      
import { TerminationReport } from "../../modules/Reports/EmployeeReports/TerminationReports";     
import { TransferReport } from "../../modules/Reports/EmployeeReports/TransferReports";         
import { AwardsReport } from "../../modules/Reports/EmployeeReports/AwardsReports";             

//  ============== 10.3 Project Reports ============= 
import { ProjectRep } from "../../modules/Reports/ReportsProject/Project";                

//  ============== 10.4 Trainee Reports ============= 
import { TraineeReport } from "../../modules/Reports/ReportsProject/TraineeReports";

//  ============== 10.5 TimeSheet Reports ============= 
import { CurrentAbsent } from "../../modules/Reports/TimeSheetReports/CurrentlyAbsent";
import { MonthlyAbsent } from "../../modules/Reports/TimeSheetReports/MonthlyAbsent";




export const anonymous = [
    {
        routePath: "/signin",
        Component: UserSignin,
    },
];

export const adminAuthenticated = [

    {
        routePath: '/',
        Component: Dashboard,
    },
    // {
    //     routePath: '/profile',
    //     Component: Profile,
    // },

    //----- 1 Company Organization ----
    {
        routePath: '/company_organization_companyprofile',   
        Component: CompanyProfile,
    },
    {
        routePath: '/company_organization_announcement',    
        Component: AnnouncementTableIndex,
    },
    {
        routePath: '/company_organization_expense_table',   
        Component: ExpenseTableIndex,
    },

    //----- 2 Customer And Client ----
    {
        routePath: '/customer_and_client',        
        Component: CustomerAndClient,
    },

    //----- 3  Employees ----
    {
        routePath: '/employee_add_employee',       
        Component: AddEmployee,
    },
    {
        routePath: '/employee_qualification_and_certificates',       
        Component: EmployeeQualificationAndCertificates,
    },
    {
        routePath: '/qualification_and_certificates',       
        Component: QualificationAndCertificates,
    },
    {
        routePath: '/employee_awards',     
        Component: EmployeeAwards,
    },
    {
        routePath: '/employee_transfer',  
        Component: EmployeeTransfer,
    },
    {
        routePath: '/employee_resignation',      
        Component: EmployeeResignation,
    },
    {
        routePath: '/employee_promotions',       
        Component: EmployeePromotions,
    },
    {
        routePath: '/employee_complaints',       
        Component: EmployeeComplaints,
    },
    {
        routePath: '/employee_terminations',      
        Component: EmployeeTerminations,
    },
    {
        routePath: '/employee_project_work',      
        Component: ProjectWork,
    },
    {
        routePath: '/employee_project_report',      
        Component: ProjectReport,
    },
    {
        routePath: '/employee_leave',      
        Component: EmployeeLeave,
    },
    {
        routePath: '/employee_emergency_contacts',       
        Component: EmergencyContacts,
    },
    {
        routePath: '/employee_exit',       
        Component: EmployeeExit,
    },

    // ------ 4 Time Sheet -----
    {
        routePath: '/timesheet_attendance',     
        Component: AttendanceIndex,
    },
    {
        routePath: '/timesheet_update_attendance',
        Component: UpdateAttendance,
    },
    {
        routePath: '/view_attendance',    
        Component: ViewAttendance,
    },
    // {
    //     routePath: '/timesheet_holidays',         
    // },

    // ------ 5 Payroll for Employees -----
    {
        routePath: '/payroll',      
        Component: Payroll,
    },
    {
        routePath: '/view_payroll',      
        Component: ViewPayroll,
    },

    // ------ 6  Projects --------
    {
        routePath: '/projects_addprojects',       
        Component: AddProject
    },

    // ------ 7  Worksheet --------

    {
        routePath: '/worksheet_task',         
        Component: WorksheetTasks
    },

    // ------ 8  Training ---------
    {
        routePath: '/training_trainee_details',        
        Component: TraineeDetails
    },
    {
        routePath: '/training_trainee_class',      
        Component: TraineeClass
    },

    // ------ 9  Assests ---------

    {
        routePath: '/add_assests',     
        Component: AssestsIndex
    },

    // ------ 10  Reports ---------

    {
        routePath: '/company_reports',        
        Component: CompanyReport
    },
    {
        routePath: '/Expense_reports',       
        Component: ExpenseReport
    },
    {
        routePath: '/Payroll_reports',       
        Component: PayrollRep
    },
    {
        routePath: '/monthly_payroll_reports',       
        Component: PayrollMonth
    },
    // {
    //     routePath: '/Worksheet_reports',       
    //     Component: WorkSheetReport
    // }, 
    {
        routePath: '/monthly_expense_reports',       
        Component: ExpenseByMonthReport
    },
    {
        routePath: '/yearly_expense_reports',     
        Component: ExpenseByYear
    },
    {
        routePath: '/current_expense_reports',       
        Component: CurrentExpense
    },
    {
        routePath: '/complaints_reports',       
        Component: ComplaintsReport
    },
    {
        routePath: '/project_reports_emp',        
        Component: ProjectReportEmp
    },
    {
        routePath: '/project_work_reports',        
        Component: ProjectWorkReport
    },
    {
        routePath: '/promotion_reports',       
        Component: PromotionReport
    },
    {
        routePath: '/resignation_reports',     
        Component: ResignationReport
    },
    {
        routePath: '/termination_reports',         
        Component: TerminationReport
    },
    {
        routePath: '/transfer_reports',      
        Component: TransferReport
    },
    {
        routePath: '/awards_reports',       
        Component: AwardsReport
    },
    {
        routePath: '/Project_reports',     
        Component: ProjectRep
    },
    {
        routePath: '/Trainee_reports',        
        Component: TraineeReport
    },
    {
        routePath: '/currently_absent',       
        Component: CurrentAbsent
    },
    {
        routePath: '/monthly_absent',   
        Component: MonthlyAbsent
    },
    {
        routePath: '*',
        Component: PageNotFound,
    }, PromotionReport

]
