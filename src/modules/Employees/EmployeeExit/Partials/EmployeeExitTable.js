import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { CustomTag } from '../../../../components/CustomTag';
import Flex from '../../../../components/Flex';
import { CustomModal } from '../../../../components/CustomModal';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { CustomTable } from '../../../../components/CustomTable';
import { EmployeeExitForm } from './EmployeeExitForm';
import { ViewEmployeeExitData } from './ViewEmployeeExitData';
import { useDispatch, useSelector } from 'react-redux';
import { getExit, getExitError, getExitStatus, selectAllExit } from '../../../../Store/CustomSlice/SecondemployeeSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';
import request from '../../../../utils/request';
import { Popconfirm } from 'antd';

export const EmployeeExitTable = () => {

    const [dataSource, setDataSource] = useState([]);
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    const [trigger, setTrigger] = useState(0)

    const dispatch = useDispatch();

    const AllExit = useSelector(selectAllExit)
    const ExitStatus = useSelector(getExitStatus)
    const ExitError = useSelector(getExitError)

    useEffect(() => {
        dispatch(getExit());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllExit);
    }, [AllExit])
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

    const UpdateEmployeeExit = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Employee Exit");
        setModalContent(<EmployeeExitForm formname={'EmployeeExitUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updaterecord={record} updatetrigger={trigger} />);
        showModal();
    };

    const ViewEmployeeExit = (record) => {
        setModalTitle("View Employee Exit");
        setModalContent(<ViewEmployeeExitData formname={'ViewEmployeeExitForm'} FormExternalClose={FormExternalClose} formReset={formReset} viewrecord={record} />);
        showModal();
    };


    const StatusExit = (record) => {

        if (record.status === false || record.status === true) {
            request
                .put(`employeeexit/or/${record.employee_exit_id}`)
                .then(function (response) {
                    dispatch(getExit());
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
                                onConfirm={() => StatusExit(record)}
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
                                onConfirm={() => StatusExit(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewEmployeeExit(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateEmployeeExit(record) }}>
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
            title: 'Employee Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Date Of Exit',
            dataIndex: 'date',
        }
    ]

    let content;

    if (ExitStatus === 'loading') {
        content = <CommonLoading />
    } else if (ExitStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.employee_exit_id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (ExitStatus === 'failed') {
        content = <h2>
            {ExitError}
        </h2>
    }

    return (
        <Fragment>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
