import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { CustomTable } from '../../../../components/CustomTable';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { ViewTraineeClassData } from './ViewTraineeClassData';
import { TraineeClassForm } from './TraineeClassForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingClass, getTrainingErrorClass, getTrainingStatusClass, selectAllTrainingClass } from '../../../../Store/CustomSlice/TrainingSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';

export const TraineeClassTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // table source

    const [dataSource, setDataSource] = useState([]);

    const [trigger, setTrigger] = useState(0);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);


    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const dispatch = useDispatch();

    const AllTrainingClass = useSelector(selectAllTrainingClass)
    const TrainingStatusClass = useSelector(getTrainingStatusClass)
    const TrainingErrorClass = useSelector(getTrainingErrorClass)

    useEffect(() => {
        dispatch(getTrainingClass());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllTrainingClass);
    }, [AllTrainingClass])

    const UpdateTraineeClass = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Trainee Class");
        setModalContent(<TraineeClassForm formname={'TraineeClassUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateTraineeClassrecord={record} updatetrigger={trigger} />);
        showModal();
    };

    const ViewTraineeClass = (record) => {
        setModalTitle("View Trainee Class");
        setModalContent(<ViewTraineeClassData viewtraineeClassrecord={record} />);
        showModal();
    };

    const TableColumn = [

        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewTraineeClass(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateTraineeClass(record) }}>
                            <FiEdit />
                        </TableIconHolder>
                    </Flex>
                );
            },
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

    // const data = [{
    //     key: '1',
    //     trainee_name: 'Trainer ',
    //     name:'Shishyan',
    //     no_of_sections:'7'
    // }]

    let content;

    if (TrainingStatusClass === 'loading') {
        content = <CommonLoading />
    } else if (TrainingStatusClass === 'succeeded') {
        const rowKey = (dataSource) => dataSource.trainee_class_id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (TrainingStatusClass === 'failed') {
        content = <h2>
            {TrainingErrorClass}
        </h2>
    }

    return (
        <Fragment>

            {content}

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
