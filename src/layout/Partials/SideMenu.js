import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { BiSitemap } from "react-icons/bi";
import { useState } from "react";
import { VscOrganization } from 'react-icons/vsc'
import { AiFillMoneyCollect, AiOutlineFileSync, AiOutlineReconciliation, AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const SideMenu = () => {

    const rootSubinmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10'];

    // const rootSubinmenuKeyss = ['sub12', 'sub13', 'sub14', 'sub15'];

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange = (keys) => {
        console.log("onOpenChange keys:", keys);
    
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubinmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    
    // const onChangetwo = (keys) => {
    //     console.log("onChangetwo keys:", keys);
    
    //     const latestOpenKeys = keys.find((key) => openKeys.indexOf(key) === -1);
    //     if (rootSubinmenuKeyss.indexOf(latestOpenKeys) === -1) {
    //         setOpenKeys(keys);
    //     } else {
    //         setOpenKeys(latestOpenKeys ? [latestOpenKeys] : []);
    //     }
    // };

    const items = [
        getItem('Dashboard', '', <BiSitemap />),

        // getItem('Profile', 'sub1', <ImProfile />, [
        //     // Object.keys(company).length === 0 && getItem('Add Profile', 'headoffice_cmpy_profile'),
        //     getItem('View Profile', 'profile'),
        // ]),

        // ---------- 1 Company Organization 
        getItem('Company Organization', 'sub2', <VscOrganization />, [
            getItem('Company Profile', 'company_organization_companyprofile'),  
            getItem('Company Announcements', 'company_organization_announcement'),  
            getItem('Company Expense', 'company_organization_expense_table'),   
        ]),

        // ------ 2 Customer And Client

        getItem('Customer And Client', 'sub3', <AiOutlineUsergroupAdd />, [
            getItem('Customer And Client', 'customer_and_client'), 
        ]),

        // ---------- 3 Employees

        getItem('Employee', 'sub4', <AiOutlineUserAdd/>, [
            getItem('Add Employee', 'employee_add_employee'),  
            getItem('Qualification And Certificates', 'employee_qualification_and_certificates'), 
            getItem('Awards', 'employee_awards'),  
            getItem('Promotions', 'employee_promotions'),  
            getItem('Transfer', 'employee_transfer'),  
            getItem('Employee Leave', 'employee_leave'), 
            getItem('Complaints', 'employee_complaints'), 
            getItem('Resignation', 'employee_resignation'),  
            getItem('Terminations', 'employee_terminations'),  
            getItem('Employee Exit', 'employee_exit'),  
            // getItem('Project Report', 'employee_project_report'),  
            getItem('Emergency Contacts', 'employee_emergency_contacts'),  
  
        ]),

        // ----------- 4  Time Sheet
        getItem('Time Sheet', 'sub5', <AiOutlineFileSync />, [
            getItem('Attendance', 'timesheet_attendance'),   
            getItem('Update Attendance', 'timesheet_update_attendance'), 
            getItem('View Attendance', 'view_attendance'),  
            // getItem('Holidays', 'timesheet_holidays')   
        ]),

        // ----------- 5  Payroll for Employees
        getItem('Payroll for Employees', 'sub6', <AiFillMoneyCollect/>, [
            getItem('Payroll', 'payroll'), 
            getItem('View Payroll', 'view_payroll'), 
        ]),
    
        // ----------- 6  Project
        getItem('Project', 'sub7', <AiOutlineReconciliation/>, [
            getItem('Project', 'projects_addprojects'),  
            getItem('Project Work', 'employee_project_work'),  
        ]),

        // ----------- 7 Worksheet
        // getItem('Worksheet', 'sub8', <AiOutlineReconciliation />, [
        //     getItem('Tasks', 'worksheet_task'),   //7.1
        // ]),

        // ----------- 8 Training
        getItem('Training', 'sub8', <AiOutlineReconciliation />, [
            getItem('Training Details', 'training_trainee_details'),  
            getItem('Trainee Class', 'training_trainee_class'),  
        ]),

        // ----------- 9 Assests

        getItem('Assests', 'sub9', <AiOutlineReconciliation />, [
            getItem('Add Assests', 'add_assests'),   

        ]),

        // ----------- 10 Reports

        getItem('Reports', 'sub10', <AiOutlineReconciliation />, [
            getItem('Company Reports ', 'sub11', null, [ 
                getItem('Announcement Reports ', 'company_reports'),     
            ]),
                getItem('Expense Reports ', 'sub12', null, [   
                getItem('Current Expense', 'current_expense_reports'),   
                getItem('Monthly Expense', 'monthly_expense_reports'),    
                getItem('All Expense ', 'Expense_reports'),   
                getItem('Yearly Expense', 'yearly_expense_reports'),     
            ]),
                // getItem('Worksheet Reports ', 'Worksheet_reports'), 
                getItem('Expense Reports ', 'sub13', null, [   
                getItem('Payroll Reports ', 'Payroll_reports'),    
                getItem('Monthly Payroll', 'monthly_payroll_reports'),    
            ]),
            getItem('Employee Reports ', 'sub14', null, [         
                getItem('Complaints', 'complaints_reports'),         
                getItem('Promotion', 'promotion_reports'),        
                getItem('Resignation', 'resignation_reports'),     
                getItem('Termination', 'termination_reports'),     
                getItem('Transfer', 'transfer_reports'),           
                getItem('Awards', 'awards_reports'),         
            ]),
            getItem('Project Reports ', 'sub15', null, [
                getItem('Project Reports ', 'Project_reports'),        
                getItem('Project Work', 'project_work_reports'),             
            ]),
            getItem('Trainee Reports ', 'sub16', null, [
                getItem('Trainee Reports ', 'Trainee_reports'),    
            ]),
            getItem('Time Sheet Reports ', 'sub17', null, [
                getItem('Today Absentees  ','currently_absent'),     
                getItem('Month Attendance', 'monthly_absent'),     
            ]),
        ]),
    ];

    const navigate = useNavigate();

    const onClick = ({ key }) => {

        if (key === null) {
        }
        else {
            navigate(`${key}/`)
        }
    }

    return (
       
        <Menu
        onClick={onClick}
        openKeys={openKeys}
        onOpenChange={(keys) => {
            onOpenChange(keys);
            // onChangetwo(keys);
        }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
    />
       
    )
}

