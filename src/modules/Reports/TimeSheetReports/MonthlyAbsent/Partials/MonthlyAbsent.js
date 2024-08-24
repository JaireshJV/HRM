import { Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'



export const MonthlyAbsentTable = () => {

    const [dataSource, setDataSource] = useState([])

    // ----- Define Form
    const [form] = Form.useForm();

    useEffect(() => {
        YearlyReports()
    }, [])

    const YearlyReports = () => {
        request
            .get('attendance/absent/count')
            .then(function (response) {
                toast.success(response.data);
                setDataSource(response.data);
                form.resetFields();
            })
            .catch(error => {});
    };


    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },

        {
            title: 'Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Designation Name',
            dataIndex: 'designation_name',
        },
        {
            title: 'Department Name',
            dataIndex: 'department_name',
        },
        {
            title: 'Present Count',
            dataIndex: 'present_count',
        },
        {
            title: 'Absent Count',
            dataIndex: 'absent_count',
        },


    ]

    return (
        <Fragment>
      
            <CustomTable data={dataSource} columns={columns} />
         
        </Fragment>
    )
}
