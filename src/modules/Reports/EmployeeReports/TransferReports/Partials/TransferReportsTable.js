
import { Fragment, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomModal } from '../../../../../components/CustomModal'

export const TransferReportTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            title: 'Employee Name',
            dataIndex: 'first_name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation_name',
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
        },
        {
            title: 'Transfered To',
            dataIndex: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        }

    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
