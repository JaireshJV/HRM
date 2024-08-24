import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../../components/Flex';
import { CustomTable } from '../../../../components/CustomTable';
import { CustomCheckBox } from '../../../../components/Form/CustomCheckBox';
import { CustomRadioButton } from '../../../../components/Form/CustomRadioButton';
import { Form } from 'antd';
import { CustomTimePicker } from '../../../../components/Form/CustomTimePicker';
import Button from '../../../../components/Form/CustomButton'
import Label from '../../../../components/Form/Label';
import { CustomInput } from '../../../../components/Form/CustomInput';
import request from '../../../../utils/request';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, getEmployeeError, getEmployeeStatus, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';




export const AttendanceTable = () => {

    const [dataSource, setDataSource] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    const dispatch = useDispatch();


    const [form] = Form.useForm();

    const handleActivate = (record) => {

        if (selectedRows.includes(record.employee_id)) {
            // If the record.employee_id is in the selectedRows array, remove it using filter
            setSelectedRows((prevSelectedRows) =>
                prevSelectedRows.filter((item) => item !== record.employee_id)
            );

            // If the record.employee_id is in the selectedValue array, remove it using filter
            setSelectedValue((prevSelectedValue) =>
                prevSelectedValue.filter((item) => item.id !== record.employee_id)
            );

            const fieldName = `section${record.employee_id}`;
            const inTime = `in_time${record.employee_id}`;
            const outTime = `out_time${record.employee_id}`;
            form.setFieldsValue({
                [fieldName]: '',
                [inTime]: '',
                [outTime]: '',
            });

        } else {
            // If the record.employee_id is not in the selectedRows array, add it using spread operator
            setSelectedRows((prevSelectedRows) => [...prevSelectedRows, record.employee_id]);

            // If the record.employee_id is not in the selectedValue array, add it with the section value
            setSelectedValue((prevSelectedValue) => [
                ...prevSelectedValue,
                { id: record.employee_id, section: "" }, // You can set the initial section value here.
            ]);
        }
    };

    useEffect(() => {
        dispatch(getEmployee())
    }, [dispatch])

    const employeeDetails = useSelector(selectAllEmployee)
    const employeeStatus = useSelector(getEmployeeStatus)
    const employeeError = useSelector(getEmployeeError)

    useEffect(() => {
        setDataSource(employeeDetails)
    }, [employeeDetails])


    const options = [
        {
            label: 'Half',
            value: 'Half',
        },
        {
            label: 'Full',
            value: 'Full',
        },
    ];

    const handleRadioChange = (e, record) => {

        const selectedItemId = record.employee_id;
        const selectedSection = e.target.value;

        // Check if the selected id and section combination already exists in the array
        const existingIndex = selectedValue.findIndex(
            (item) => item.id === selectedItemId && item.section === selectedSection
        );

        if (existingIndex !== -1) {
            // If the combination exists, do nothing as it is already selected
            return;
        }

        // Check if the selected id exists in the array but with a different section
        const sameIdIndex = selectedValue.findIndex((item) => item.id === selectedItemId);

        if (sameIdIndex !== -1) {
            // If the same id exists, update the section for that id
            setSelectedValue((prevSelectedValue) =>
                prevSelectedValue.map((item, index) =>
                    index === sameIdIndex ? { ...item, section: selectedSection } : item
                )
            );
        } else {
            // If the id does not exist, add the new selected value to the array
            setSelectedValue((prevSelectedValue) => [
                ...prevSelectedValue,
                { id: selectedItemId, section: selectedSection },
            ]);
        }
    };

    const InTimeChange = (e) => {
    }

    const OutTimeChange = (e) => {
    }

    useEffect(() => {
        dataSource.forEach(record => {
            form.setFieldsValue({ [`employeeId${record.employee_id}`]: record.employee_id });
            form.setFieldsValue({ [`att_status${record.employee_id}`]: record.att_status });
            form.setFieldsValue({ [`section${record.employee_id}`]: record.section });
        });
    }, [dataSource,form])

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
            render: (text, record) => {

                return (
                    <>
                        <span>{text}</span>
                        <CustomInput name={`employeeId${record.employee_id}`} display={'none'} />
                    </>
                )
            }
        },
        {
            title: 'Designation',
            dataIndex: 'designation_name',
        },
        {
            title: 'Name',
            dataIndex: 'first_name',
            render: (text, record) => {
                return (
                    <span>{text} {record.last_name}</span>
                )
            }
        },
        {
            title: 'Status',
            render: (_, record) => {
                const isRowSelected = selectedRows.includes(record.employee_id);
                return (
                    <Fragment>
                        {isRowSelected ? <h3 style={{ color: 'Green' }}> Present</h3> : <h3 style={{ color: 'Red' }}>Absent</h3>}
                    </Fragment>
                )
            }
        },
        {
            title: 'Attendance',
            children: [
                {
                    title: 'Present',
                    render: (_, record) => {
                        const isRowSelected = selectedRows.includes(record.employee_id);


                        return (
                            <CustomCheckBox
                                name={`att_status${record.employee_id}`}
                                checked={isRowSelected}
                                onChange={() => handleActivate(record)}
                            />
                        );
                    }
                },
                {
                    title: 'Section',
                    render: (_, record) => {
                        const isRowSelected = selectedRows.includes(record.employee_id);

                        return (
                            <Fragment>
                                {
                                    isRowSelected ? (
                                        <CustomRadioButton
                                            name={`section${record.employee_id}`}
                                            value={isRowSelected}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select Section !',
                                                }
                                            ]}
                                            onChange={(e) => handleRadioChange(e, record)}
                                            options={options} />
                                    ) : (
                                        <CustomRadioButton name={`section${record.employee_id}`} value={''} disabled={!isRowSelected} options={options} />
                                    )
                                }
                            </Fragment>
                        )
                    }
                },
            ]
        },
        {
            title: 'In-Time',
            render: (_, record) => {
                const isRowSelected = selectedRows.includes(record.employee_id);
                return (
                    <Fragment>
                        {
                            isRowSelected ? (
                                <CustomTimePicker
                                    name={`in_time${record.employee_id}`}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select In - Time !',
                                        }
                                    ]}
                                    onChange={(e) => InTimeChange(e, record)} />
                            ) : (
                                <CustomTimePicker use12Hours name={`in_time${record.employee_id}`} disabled={!isRowSelected} />
                            )
                        }
                    </Fragment>
                )
            }
        },
        {
            title: 'Out-Time',
            render: (_, record) => {
                const isRowSelected = selectedRows.includes(record.employee_id);
                return (
                    <Fragment>
                        {
                            isRowSelected ? (
                                <CustomTimePicker
                                    name={`out_time${record.employee_id}`}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select OUT - Time !',
                                        }
                                    ]}
                                    onChange={(e) => OutTimeChange(e, record)} />
                            ) : (
                                <CustomTimePicker use12Hours name={`out_time${record.employee_id}`} disabled={!isRowSelected} />
                            )
                        }
                    </Fragment>
                )
            }
        },
    ]

    const onFinish = (values) => {
        let result = {
            attendanceDate: dayjs(),
            attendance: Object.entries(values)
                .filter(([key]) => key.startsWith('employeeId'))
                .map(([key, employeeId]) => {
                    const index = key.match(/\d+/)[0];
                    const attstatuskey = `att_status${index}`;
                    const sectionkey = `section${index}`;
                    const inTimekey = `in_time${index}`;
                    const outTimekey = `out_time${index}`;
                    return {
                        employeeId,
                        attstatus: values[attstatuskey] !== undefined ? values[attstatuskey] : false,
                        section: values[sectionkey] !== undefined ? values[sectionkey] : '',
                        intime: values[inTimekey] !== undefined ? dayjs(values[inTimekey]).format("HH:mm:ss A") : '',
                        outtime: values[outTimekey] !== undefined ? dayjs(values[outTimekey]).format("HH:mm:ss A") : '',
                    };
                }),
        };

        PostAttendance(result);

    }

    const onFinishFailed = (errorInfo) => {
    };

    const PostAttendance = (value) => {
        request.post('attendance/save', value)
            .then(response => {
                toast.success('Attendance Successs!')
                form.resetFields()
            })
            .catch(error => {})
    }

    let content;

    if (employeeStatus === 'loading') {
        content = <CommonLoading />
    } else if (employeeStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} pagination={false}/>
    } else if (employeeStatus === 'failed') {
        content = <h2>
            {employeeError}
        </h2>
    }


    return (
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
                <CustomInput name={'date'} disabled={true} />
                {/* <CustomDatePicker width={200} onChange={handleDateChange} name={'date'} /> */}
            </Flex><br />

            {content}

            <Flex spaceEvenly style={{ margin: '20px' }} gap={'20px'}>
                <Button.Primary htmlType="submit" text={'Save'} />
            </Flex>
        </Form>
    )
}
