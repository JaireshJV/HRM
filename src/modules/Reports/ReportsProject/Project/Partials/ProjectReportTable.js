
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'
import { useSelector, useDispatch } from 'react-redux'
import { getProject, getProjectsError, getProjectsStatus } from '../../../../../Store/CustomSlice/ProjectSlice'
import { CommonLoading } from '../../../../../components/Form/CommonLoading'

export const ProjectReportTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProject())
    }, [dispatch])

    const projectStatus = useSelector(getProjectsStatus)
    const projectError = useSelector(getProjectsError)

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
            dataIndex: 'projectTitle',
        },
        {
            title: 'Client Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Start Date',
            dataIndex: 'fromDate',
        },
        {
            title: 'End Date',
            dataIndex: 'toDate',
        },
        {
            title: 'Total Duration',
            dataIndex: 'totalDuration',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
        },
        {
            title: 'Location',
            dataIndex: 'city',
        },
        {
            title: 'Assigned To',
            render: (record, i) => {
                if (Array.isArray(record.designationName)) {
                    return (
                        <div>
                            {record.designationName.map((value, index) => (
                                <h3 key={index}>{value}, </h3>
                            ))}
                        </div>
                    );
                } else {
                    return null; // or some default content
                }
            },
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalProjectAmount',
        },
       
    ]



    let content;

    if (projectStatus === 'loading') {
        content = <CommonLoading />
    } else if (projectStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    } else if (projectStatus === 'failed') {
        content = <h2>
            {projectError}
        </h2>
    }


    return (
        <Fragment>
            {content}
            {/* <CustomTable data={dataSource} columns={columns} /> */}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
