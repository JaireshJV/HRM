
import { Fragment, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomModal } from '../../../../../components/CustomModal'

export const ProjectReportTableEmp = ({ dataSource }) => {
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
            title: 'Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Project Name',
            dataIndex: 'project_title',
        },
        {
            title: 'Project Date Given',
            dataIndex: 'date_give',
        },
        {
            title: 'Project Date Extended',
            dataIndex: 'extended_date',
        },
        {
            title: 'Total Project Duration Days',
            dataIndex: 'duration',
        },

    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
