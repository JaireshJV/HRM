
import { Fragment, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'

export const PayrollByMonthTable = ({ dataSource }) => {
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
            title: 'Date',
            dataIndex: 'date',
          },
          {
            title: 'Current Salary',
            dataIndex: 'current_salary',
          },
       
    ]



    // let content;

    // if (announcementStatus === 'loading') {
    //     content = <CommonLoading />
    // } else if (announcementStatus === 'succeeded') {
    //     const rowKey = (dataSource) => dataSource.id;
    //     content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    // } else if (announcementStatus === 'failed') {
    //     content = <h2>
    //         {announcementError}
    //     </h2>
    // }


    return (
        <Fragment>
            {/* {content} */}
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
