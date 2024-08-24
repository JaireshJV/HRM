import { Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'

export const WorkSheetTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);


    // ----- Define Form
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
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
            title: 'Project Title',
            dataIndex: 'project_title',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assigned_to',
        }
       
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
