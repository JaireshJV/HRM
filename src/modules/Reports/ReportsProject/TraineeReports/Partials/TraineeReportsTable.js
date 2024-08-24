
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'
import { useDispatch } from 'react-redux'
import { getTrainingClass} from '../../../../../Store/CustomSlice/TrainingSlice'


export const TraineeReportsTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrainingClass())
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
            title: 'Trainer Name',
            dataIndex: 'trainer_name',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Name of section',
            dataIndex: 'section_name',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
        },
        {
            title: 'Total Modules',
            dataIndex: 'total_modules',
        },
        {
            title: 'Total Duration',
            dataIndex: 'total_duration',
        }
    ]

    return (
        <Fragment>
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
