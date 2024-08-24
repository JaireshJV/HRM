import React, { Fragment, useEffect, useState } from 'react'
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { CustomTable } from '../../../../components/CustomTable';
import { CustomTag } from '../../../../components/CustomTag';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { UpdateAttendanceForm } from './UpdateAttendanceForm';
import { AiOutlineEye } from 'react-icons/ai';
import Label from '../../../../components/Form/Label';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { Form } from 'antd';
import ViewUpdateAttendance from './ViewUpdateAttendance';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendance, getAttendanceError, getAttendanceStatus, selectAllAttendance } from '../../../../Store/CustomSlice/TimeSheetSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';


export const UpdateAttendanceTable = () => {


    const [form] = Form.useForm();

    const [dataSource, setDataSource] = useState([]);

    const dispatch = useDispatch();


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        dispatch(getAttendance())
    }, [dispatch])

    const updateAttendance = useSelector(selectAllAttendance)
    const updateAttendanceStatus = useSelector(getAttendanceStatus)
    const updateAttendanceError = useSelector(getAttendanceError)

    useEffect(() => {
        setDataSource(updateAttendance)
    }, [updateAttendance])


    useEffect(() => {
        dataSource.forEach(record => {
            form.setFieldsValue({ [`attendanceDate${record.attendanceDate}`]: record.attendanceDate });
        });
    }, [dataSource, form])

    const UpdateProject = (record) => {
        setFormReset(formReset + 1)
        setModalTitle("Update Attendance");
        setModalContent(<UpdateAttendanceForm updateRecord={record} formname={'ProjectUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewAttendance = (record) => {
        setModalTitle("View Attendance");
        setModalContent(<ViewUpdateAttendance viewRecord={record} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };


    const onFinish = (values) => {

    }

    const onFinishFailed = (errorInfo) => {

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

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewAttendance(record)}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateProject(record)}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        },
        {
            title: "Status",
            render: (record, i) => {
                return (
                    <Fragment>
                        <CustomTag
                            bordered={record.attstatus !== null}
                            color={record.attstatus ? 'processing' : 'error'}
                            title={record.attstatus ? 'Present' : 'Absent'}
                        />
                    </Fragment>
                );
            }
        },
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
        },
        {
            title: 'Employee Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Designation',
            dataIndex: 'designation_name',
        },
        {
            title: 'Section',
            dataIndex: 'section',
        },
        {
            title: 'In-Time',
            dataIndex: 'intime',
        },
        {
            title: 'Out-Time',
            dataIndex: 'outtime',
        },
    ]

    let content;

    if (updateAttendanceStatus === 'loading') {
        content = <CommonLoading />
    } else if (updateAttendanceStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (updateAttendanceStatus === 'failed') {
        content = <h2>
            {updateAttendanceError}
        </h2>
    }

    return (
        <Fragment>
            <Form
                form={form}
                name="attendance"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    date: dayjs().format('YYYY-MM-DD'),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Flex spcPading flexEnd baseLine>
                    <Label>Date :&nbsp;&nbsp;</Label>
                    <CustomInput name={'date'} disabled={'true'} />
                    {/* <CustomDatePicker width={200} onChange={handleDateChange} name={'date'} disabled={'true'}/> */}
                </Flex><br />

                {content}

                <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
            </Form>
        </Fragment>

    )
}
