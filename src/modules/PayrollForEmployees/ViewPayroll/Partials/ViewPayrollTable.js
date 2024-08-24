
import { Fragment } from 'react'
import { CustomTable } from '../../../../components/CustomTable';

export const ViewPayrollTable = ({ dataSource }) => {

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
            title: 'Total Deductions',
            dataIndex: 'total_deductions',
          },
          {
            title: 'Date',
            dataIndex: 'date',
          },
          {
            title: 'Current Salary',
            dataIndex: 'current_salary',
          },
          {
            title: 'Total Salary',
            dataIndex: 'total_salary',
          },
          {
            title: 'Allowance',
            dataIndex: 'allowance',
          },
          {
            title: 'Payment Type',
            dataIndex: 'payment_type',
          },
    ]

    return (
        <Fragment>
    
            <CustomTable data={dataSource} columns={columns} />
  
        </Fragment>
    )
}
