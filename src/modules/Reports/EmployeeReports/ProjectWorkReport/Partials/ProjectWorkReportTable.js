
import { Fragment, useState } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomModal } from '../../../../../components/CustomModal'

export const ProjectWorkReportTable = ({ dataSource }) => {
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
          title: 'Date',
          dataIndex: 'date',
        },
        {
            title: 'Employees Involved',
            render: (record) => {
              const fullName = `${record.firstName} ${record.lastName}`;
              return <span>{fullName}</span>;
            },
          },
          {
            title: 'Project Title',
            dataIndex: 'projectTitle',
          },
          {
            title: 'Designation Name',
            dataIndex: 'designationName',
          },

    ]


    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
