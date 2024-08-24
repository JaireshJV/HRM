
import { Fragment, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomModal } from '../../../../../components/CustomModal'

export const AwardsReportTable = ({ dataSource }) => {
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
            dataIndex: 'firstName',
        },
        {
            title: 'Award Type',
            dataIndex: 'awardsType',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Cash',
            dataIndex: 'cash',
        }
    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
