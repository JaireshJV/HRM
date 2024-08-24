import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import Flex from '../../../../components/Flex';
import { CustomModal } from '../../../../components/CustomModal';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { CustomTable } from '../../../../components/CustomTable';
import { ExpenseTableForm } from './ExpenseTableForm';
import { ViewExpenseTableData } from './ViewExpenseTableData';
import { CustomRow } from '../../../../components/CustomRow';
import { Col } from 'antd';
import { AddExpenseType } from './ExpenseTableModals';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense, getExpenseError, getExpenseStatus, getExpenseType, getExpenseTypeError, getExpenseTypeStatus, selectAllExpense, selectAllExpenseType } from '../../../../Store/CustomSlice/CompanySlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';

export const ExpenseTable = () => {
    const [trigger, SetTrigger] = useState(0)
    const [updateExpense, setUpdateExpense] = useState(0)
    const [dataSource, setDataSource] = useState([]);

    const [tableForm, setTableForm] = useState([]);
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);


    const dispatch = useDispatch();

    const AllExpenseType = useSelector(selectAllExpenseType)
    const ExpenseTypeStatus = useSelector(getExpenseTypeStatus)
    const ExpenseTypeError = useSelector(getExpenseTypeError)
    const AllExpense = useSelector(selectAllExpense)
    const ExpenseStatus = useSelector(getExpenseStatus)
    const ExpenseError = useSelector(getExpenseError)

    useEffect(() => {
        setTableForm(AllExpense)
    }, [AllExpense])

    useEffect(() => {
        dispatch(getExpense());
    }, [updateExpense,dispatch]);

    useEffect(() => {
        dispatch(getExpenseType());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllExpenseType);
    }, [AllExpenseType])

    const handleUpdate = () => {
        setUpdateExpense(updateExpense + 1)

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

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateExpense = (record) => {
        SetTrigger(trigger + 1)
        setModalContent(<ExpenseTableForm updateRecord={record} handleUpdate={handleUpdate} formname={'ExpenseUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updatetrigger={trigger} />);
        showModal();
    };

    const UpdateExpenseType = (record) => {
        SetTrigger(trigger + 1)
        setModalTitle("Update Expense Type");
        setModalContent(<AddExpenseType trigger={trigger} handleRecord={record} formname={'ExpenseTypeUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewExpense = (record) => {
        setModalTitle("View Expense");
        setModalContent(<ViewExpenseTableData viewRecord={record} formname={'ViewExpenseForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
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

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewExpense(record)}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateExpense(record)}>
                            <FiEdit />
                        </TableIconHolder>
                    </Flex>
                );
            },
        },
        {
            title: 'Expense Name',
            dataIndex: 'expense_name',
        },
        {
            title: 'Expense Date',
            dataIndex: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Expense Type',
            dataIndex: 'expense_type',
        }
    ]

    const ExpenseTypeColumn = [

        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateExpenseType(record)}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        },
        {
            title: 'Expense Type',
            dataIndex: 'expenseType',
        }
    ]

    let content1;

    if (ExpenseStatus === 'loading') {
        content1 = <CommonLoading />
    } else if (ExpenseStatus === 'succeeded') {
        const rowKey = (tableForm) => tableForm.expense_id;
        content1 = <CustomTable columns={TableColumn} data={tableForm} rowKey={rowKey} />
    } else if (ExpenseStatus === 'failed') {
        content1 = <h2>
            {ExpenseError}
        </h2>
    }

    let content2;

    if (ExpenseTypeStatus === 'loading') {
        content2 = <CommonLoading />
    } else if (ExpenseTypeStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.expenseTypeId;
        content2 = <CustomTable columns={ExpenseTypeColumn} data={dataSource} rowKey={rowKey} />
    } else if (ExpenseTypeStatus === 'failed') {
        content2 = <h2>
            {ExpenseTypeError}
        </h2>
    }

    return (
        <Fragment>

            <CustomRow space={[12, 12]}>
                <Col span={24} md={24}>
                    {content1}
                </Col>

                <Col span={24} md={12}>
                    {content2}
                </Col>

            </CustomRow>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
