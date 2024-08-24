import React from 'react'
import { FaUsers,FaWater } from 'react-icons/fa'
import { RiUser3Line } from 'react-icons/ri'
import { AiOutlineFundProjectionScreen,AiOutlineClose } from 'react-icons/ai'
import { CiBadgeDollar } from "react-icons/ci";

export const DashboardData = [
    {
        key: '1',
        icon: <RiUser3Line />,
        h1: 'Total Present',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/timesheet_update_attendance'

    },
    {
        key: '2',
        icon: <RiUser3Line />,
        h1: 'Total Absent',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/timesheet_update_attendance'
    },
    {
        key: '3',
        icon: <AiOutlineFundProjectionScreen />,
        h1: 'Total Projects',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/projects_addprojects'
    },

    {
        key: '4',
        icon: <FaUsers />,
        h1: 'Total Employees',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/employee_add_employee'
    },
    {
        key: '5',
        icon: <AiOutlineFundProjectionScreen />,
        h1: 'Current Expenses',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/current_expense_reports'
    },
    {
        key: '5',
        icon: <FaWater />,
        h1: 'Terminations',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/employee_terminations'
    },
    {
        key: '6',
        icon: <CiBadgeDollar />,
        h1: 'Month Salary',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/payroll'
    },
    {
        key: '7',
        icon: <AiOutlineClose />,
        h1: 'Employee Exit',
        Amount: '',
        p: '',
        Total: '',
        navigate: '/employee_exit'
    },
]





