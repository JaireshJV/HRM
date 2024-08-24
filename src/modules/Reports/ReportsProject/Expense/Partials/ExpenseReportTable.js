
import { Fragment } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'

export const ExpenseReportTable = ({ dataSource }) => {


    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Expense Name',
            dataIndex: 'expense_name',
        },
        {
            title: 'Expense Date',
            dataIndex: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Expense Type',
            dataIndex: 'expense_type',
        },
       
    ]

    return (
        <Fragment>
    
            <CustomTable data={dataSource} columns={columns} />

        </Fragment>
    )
}
