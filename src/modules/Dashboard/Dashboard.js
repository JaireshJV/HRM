import { Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CustomRow } from '../../components/CustomRow';
import { Cards, BarHolder, BarChart } from './style';
import Flex from '../../components/Flex';
import request from '../../utils/request';
import { DashboardData } from './DashboardData';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(DashboardData);
    const [pieData, setPieData] = useState([])
    const [incomeData, setIncomeData] = useState([])
    const [expenseData, setExpenseData] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from backend and update state
        fetchData();
        getPieData();
        getIncome();
        getExpense();
    }, []);

    const incomeArray = [];
    const expenseArray = [];

    for (let i = 1; i <= 12; i++) {
        const incomeEntry = incomeData.find(item => item.month === i);
        if (incomeEntry) {
            incomeArray.push(incomeEntry.total_project_amount);
        } else {
            incomeArray.push(0);
        }
    }

    for (let i = 1; i <= 12; i++) {
        const expenseEntry = expenseData.find(item => item.month === i);
        if (expenseEntry) {
            expenseArray.push(expenseEntry.expense);
        } else {
            expenseArray.push(0);
        }
    }
    const data = {
        labels: ['OnProcess', 'Completed', 'Hold', 'Pending'],
        datasets: [
            {
                data: pieData,
                // backgroundColor: ['yellow', 'green', 'blue', 'red'],
                backgroundColor: [
                    'rgba(255, 255, 51, 1)',
                    'rgba(65, 255, 65, 1)',
                    'rgba(97, 160, 255, 1)',
                    'rgba(255, 73, 73, 1)',

                ],
                borderColor: [
                    'white'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 255, 51, 0.5)',
                    'rgba(65, 255, 65, 0.5)',
                    'rgba(97, 160, 255, 0.5)',
                    'rgba(255, 73, 73, 0.5)',
                ],
                hoverBorderColor: [
                    'rgba(255, 255, 51, 1)',
                    'rgba(65, 255, 65, 1)',
                    'rgba(97, 160, 255, 1)',
                    'rgba(255, 73, 73, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 5,
                cutout: 60
            },
        ],
    };

    const bardata = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Expense',
                data: expenseArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgb(255, 99, 132,1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'Income',
                data: incomeArray,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgb(75, 192, 192,1)',
                ],
                borderWidth: 1,

            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        width: 400,
        height: 400,
    };

    const fetchData = () => {
        request.get('dashboard')
            .then(function (response) {
                const data = response.data;
                setDashboardData((prevData) =>
                    prevData.map((item) => {
                        switch (item.h1) {
                            case 'Total Present':
                                return {
                                    ...item,
                                    Total: data.present_count || 0,
                                };
                            case 'Total Absent':
                                return {
                                    ...item,
                                    Total: data.absent_count || 0,
                                };
                            case 'Total Projects':
                                return {
                                    ...item,
                                    Total: data.project || 0,
                                };
                            case 'Total Employees':
                                return {
                                    ...item,
                                    Total: data.employee || 0,
                                };

                            case 'Current Expenses':
                                return {
                                    ...item,
                                    Total: data.expensetotal || 0,
                                };

                            case 'Terminations':
                                return {
                                    ...item,
                                    Total: data.Terminations || 0,
                                };

                            case 'Month Salary':
                                return {
                                    ...item,
                                    Total: data.monthsalary || 0,
                                };
                            case 'Employee Exit':
                                return {
                                    ...item,
                                    Total: data.employeeexit || 0,
                                };
                            default:
                                return item;
                        }
                    })
                );
            })
            .catch(function (error) {
            });
    };

    const getPieData = () => {
        request.get('project/level')
            .then(resp => {
                console.log(resp.data,'dashboard');
                setPieData(resp.data)
            })
            .catch(error => { console.log(error,'error')})
    }

    const getIncome = () => {
        request.get('filter')
            .then(resp => {
                setIncomeData(resp.data)
            })
            .catch(error => { })
    }

    const getExpense = () => {
        request.get('filter1')
            .then(resp => {
                setExpenseData(resp.data)
            })
            .catch(error => { })
    }
    const Goto = (nav) => {
        navigate(nav.navigate)
    }
    return (
        <div >
            <CustomRow gutter={[16, 16]} >
                {dashboardData.map(({ h1, icon, Total, navigate }, i) => {
                    return (
                        <Col span={24} xs={24} sm={12} md={12} lg={6} key={i} >
                            <div onClick={() => Goto({ navigate })}>
                                <Cards>
                                    <Flex spaceBetween>
                                        {icon}
                                        <h1>{h1}</h1>
                                    </Flex>
                                    <Flex >
                                        <h4>{Total}</h4>
                                    </Flex>
                                </Cards>
                            </div>
                        </Col>
                    )
                })}
                <Col span={24} md={12} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Doughnut data={data} options={options} />
                </Col>
                <Col span={24} md={12} style={{ marginTop: '10px' }}>
                    <BarHolder>
                        <BarChart data={bardata} />
                    </BarHolder>
                </Col>
            </CustomRow>

        </div>
    )
}
