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
import { CustomRow } from '../../../../components/CustomRow';
import { Col, Popconfirm } from 'antd';
import { EmployeeLeaveForm } from './EmployeeLeaveForm';
import { LeaveTypeModal } from './EmployeeLeaveModals';
import { ViewEmployeeLeaveData } from './ViewEmployeeLeaveData';
import { useDispatch, useSelector } from 'react-redux';
import { getLeave, getLeaveError, getLeaveStatus, getLeaveType, getLeavetypeError, getLeavetypeStatus, selectAllLeave, selectAllLeavetype } from '../../../../Store/CustomSlice/SecondemployeeSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';
import request from '../../../../utils/request';

export const EmployeeLeaveTable = () => {

    const [dataSourceleavetype, setDataSourceleavetype] = useState([]);
    const [tableForm, setTableForm] = useState([])
    const [trigger, setTrigger] = useState([])

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeave())
        dispatch(getLeaveType());
    }, [dispatch]);


    const leave = useSelector(selectAllLeave)
    const leaveStatus = useSelector(getLeaveStatus)
    const leaveError = useSelector(getLeaveError)

    useEffect(() => {
        setTableForm(leave)
    }, [leave])



    const AllLeaveType = useSelector(selectAllLeavetype)
    const LeaveTypeStatus = useSelector(getLeavetypeStatus)
    const LeaveTypeError = useSelector(getLeavetypeError)



    useEffect(() => {
        setDataSourceleavetype(AllLeaveType);
    }, [AllLeaveType])

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


    const FormExternalClosee = () => {
        handleOk();
    }


    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateEmployeeLeave = (record) => {
        setModalTitle("Update Employee Leave");
        setModalContent(<EmployeeLeaveForm updateRecord={record} formname={'EmployeeLeaveUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const UpdateLeaveType = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Leave Type");
        setModalContent(<LeaveTypeModal trigger={trigger} updateRecord={record} formname={'LeaveTypeUpdateForm'} FormExternalClosee={FormExternalClosee} formReset={formReset} />);
        showModal();
    };

    const ViewEmployeeLeave = (record) => {
        setModalTitle("View Employee Leave");
        setModalContent(<ViewEmployeeLeaveData viewRecord={record} formname={'ViewEmployeeLeaveForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };



    const StatusLeave = (record) => {

        if (record.status === false || record.status === true) {
            request
                .put(`employeeleave/or/${record.employee_leave_id}`)
                .then(function (response) {
                    dispatch(getLeave());
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
                                onConfirm={() => StatusLeave(record)}
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
                                onConfirm={() => StatusLeave(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmployeeLeave(record)}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeeLeave(record)}>
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
            title: 'From Date',
            dataIndex: 'date',
        },
        {
            title: 'To Date',
            dataIndex: 'to_date',
        },
        {
            title: 'Total Days',
            dataIndex: 'total_day',
        },
        {
            title: 'Approved By',
            dataIndex: 'approved_by',
        },
        {
            title: 'Leave Type',
            dataIndex: 'leave_type',
        },
    ]

    const LeaveTypeColumn = [

        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateLeaveType(record)}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        },
        {
            title: 'Leave Type',
            dataIndex: 'leaveType',
        }
    ]

    let content;

    if (leaveStatus === 'loading') {
        content = <CommonLoading />
    } else if (leaveStatus === 'succeeded') {
        const rowKey = (tableForm) => tableForm.employee_leave_id;
        content = <CustomTable columns={TableColumn} data={tableForm} rowKey={rowKey} />
    } else if (leaveStatus === 'failed') {
        content = <h2>
            {leaveError}
        </h2>
    }

    let content2;

    if (LeaveTypeStatus === 'loading') {
        content2 = <CommonLoading />
    } else if (LeaveTypeStatus === 'succeeded') {
        const rowKey = (dataSourceleavetype) => dataSourceleavetype.leaveTypeId;
        content2 = <CustomTable columns={LeaveTypeColumn} data={dataSourceleavetype} rowKey={rowKey} />
    } else if (LeaveTypeStatus === 'failed') {
        content2 = <h2>
            {LeaveTypeError}
        </h2>
    }

    return (
        <Fragment>

            <CustomRow space={[12, 12]}>
                <Col span={24} md={24}>
                    {content}
                </Col>

                <Col span={24} md={12}>
                    {content2}
                </Col>
            </CustomRow>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
