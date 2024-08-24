import { Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'


export const ExpenseByYearTable = () => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    // ----- Define Form
    const [form] = Form.useForm();

    useEffect(() => {
        YearlyReports()
    }, [])

    const YearlyReports = () => {
        request
            .get('yearlyexpensedetails')
            .then(function (response) {
                toast.success(response.data);
                setDataSource(response.data);
                form.resetFields();
            })
            .catch(error => { });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Expense Date',
            dataIndex: 'date',
        },
        {
            title: 'Expense Type',
            dataIndex: 'expense_type',
        },
        {
            title: 'Expense Name',
            dataIndex: 'expense_name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },

    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
