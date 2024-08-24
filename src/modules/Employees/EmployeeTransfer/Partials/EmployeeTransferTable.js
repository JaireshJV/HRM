import React, { Fragment, useEffect, useState } from 'react'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { CustomTable } from '../../../../components/CustomTable'
import { EmployeeTransferForm } from './EmployeeTransferForm'
import { ViewEmployeeTransferData } from './ViewEmployeeTransferData'
import { toast } from 'react-toastify'
import { CustomTag } from '../../../../components/CustomTag'
import { getTransfer, getTransferError, getTransferStatus, selectAllTransfer } from '../../../../Store/CustomSlice/EmployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import request from '../../../../utils/request'
import { Popconfirm } from 'antd'

export const EmployeeTransferTable = () => {

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

    const AllTranfer = useSelector(selectAllTransfer)
    const TransferStatus = useSelector(getTransferStatus)
    const TransferError = useSelector(getTransferError)

    useEffect(() => {
        dispatch(getTransfer());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllTranfer);
    }, [AllTranfer])

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

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

    const UpdateEmployeeTransfer = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Employee Transfer");
        setModalContent(<EmployeeTransferForm formname={'EmployeeTransferUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} transferrecord={record} transfertrigger={trigger} />);
        showModal();
    };

    const ViewEmployeeTransfer = (record) => {
        setModalTitle("View Employee Transfer");
        setModalContent(<ViewEmployeeTransferData viewrecord={record} />);
        showModal();
    };

    const TransferStatuss = (record) => {
        if (record.status === false || record.status === true) {
            request
                .put(`transfer/or/${record.transfer_id}`)
                .then(function (response) {
                    dispatch(getTransfer());
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
                                onConfirm={() => TransferStatuss(record)}
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
                                onConfirm={() => TransferStatuss(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewEmployeeTransfer(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateEmployeeTransfer(record) }}>
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
            render: (record) => {
              const fullName = `${record.first_name} `;
              return <span>{fullName}</span>;
            },
          },
        {
            title: 'Designation',
            dataIndex: 'designation_name',
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
        },
        {
            title: 'Transfered To',
            dataIndex: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        }
    ]

    let content;

    if (TransferStatus === 'loading') {
        content = <CommonLoading />
    } else if (TransferStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.transfer_id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (TransferStatus === 'failed') {
        content = <h2>
            {TransferError}
        </h2>
    }

    return (
        <Fragment>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
