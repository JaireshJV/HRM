import React, { Fragment, useEffect, useState } from 'react'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { CustomTable } from '../../../../components/CustomTable'
import { TraineeDetailsForm } from './TraineeDetailsForm'
import { ViewTraineeDetailsData } from './ViewTraineeDetails'
import { CustomTag } from '../../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getTraining, getTrainingError, getTrainingStatus, selectAllTraining } from '../../../../Store/CustomSlice/TrainingSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { Popconfirm } from 'antd'
import request from '../../../../utils/request'

export const TraineeDetailsTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ====== table source ======

    const [dataSource, setDataSource] = useState([]);

    const [trigger, setTrigger] = useState(0);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const dispatch = useDispatch();

    const AllTraining = useSelector(selectAllTraining)
    const TrainingStatus = useSelector(getTrainingStatus)
    const TrainingError = useSelector(getTrainingError)

    useEffect(() => {
        dispatch(getTraining());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllTraining);
    }, [AllTraining])

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

    const UpdateTraineeDetails = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Trainee Details");
        setModalContent(<TraineeDetailsForm formname={'EmployeeTransferUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateTraineerecord={record} updatetrigger={trigger} />);
        showModal();
    };

    const ViewTraineeDetails = (record) => {
        setModalTitle("View Trainee Details");
        setModalContent(<ViewTraineeDetailsData viewtraineerecord={record} />);
        showModal();
    };



    const StatusTrainee = (record) => {

        if (record.status === false || record.status === true) {
            request
                .put(`TraineeDetails/or/${record.traineeDetailsId}`)
                .then(function (response) {
                    dispatch(getTraining());
                    if (response.data === false) {
                        toast.success('You Click In-Active');
                    }
                    else {
                        toast.success('You Click Active');
                    }
                })
                .catch(function (error) {
                });
        } else {
            toast.warn('InActive');
        }
    }

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

                        {record?.status === false &&
                            <Popconfirm
                                title="Change The Status"
                                description="Do you want to change the status into 'ACTIVE'?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => StatusTrainee(record)}
                            >
                                <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'}>
                                    <HiOutlineBellAlert />
                                </TableIconHolder>
                            </Popconfirm>
                        }
                        {record?.status === true &&

                            <Popconfirm
                                title="Change The Status"
                                description="Do you want to change the status into 'IN-ACTIVE'?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => StatusTrainee(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewTraineeDetails(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateTraineeDetails(record) }}>
                            <FiEdit />
                        </TableIconHolder>
                    </Flex>
                );
            },
        },
        {
            title: 'Status',

            render: (record, i) => {

                return (
                    <Fragment>
                        {record.status === true ? (
                            <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
                        ) : (<CustomTag bordered={"true"} color={'error'} title={'In - Active'} />)
                        }
                    </Fragment>
                );
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'State',
            dataIndex: 'state',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        }
    ]

    let content;

    if (TrainingStatus === 'loading') {
        content = <CommonLoading />
    } else if (TrainingStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.traineeDetailsId;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (TrainingStatus === 'failed') {
        content = <h2>
            {TrainingError}
        </h2>
    }

    return (
        <Fragment>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
