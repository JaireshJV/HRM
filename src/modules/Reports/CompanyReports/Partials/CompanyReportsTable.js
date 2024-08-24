import { CustomModal } from '../../../../components/CustomModal'
import { CustomTable } from '../../../../components/CustomTable'
import { useDispatch } from 'react-redux'
import { getAnnouncement } from '../../../../Store/CustomSlice/CompanySlice'
import { Fragment, useEffect, useState } from 'react'

export const CompanyReportsTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAnnouncement())
    }, [dispatch])

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
            title: 'Company Name',
            dataIndex: 'company_name',
        },
        {
            title: 'Title For Announcement',
            dataIndex: 'title',
        },
        {
            title: 'From Date',
            dataIndex: 'from_date',
        },
        {
            title: 'To Date',
            dataIndex: 'to_date',
        },
        {
            title: 'Informed By',
            dataIndex: 'informed_by',

        },
    ]

    return (
        <Fragment>
        
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
