
import { Fragment, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomModal } from '../../../../../components/CustomModal'

export const ComplaintsReportTable = ({ dataSource }) => {
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
            title: 'Complaint Against',
            dataIndex: 'complaints_against',
        },
        {
            title: 'Complaint Title',
            dataIndex: 'complaints_title',
        },
        {
            title: 'Date',
            dataIndex: 'complaints_date',
        },
        {
            title: 'Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },

    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
