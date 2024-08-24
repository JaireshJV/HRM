import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect'
import { AddDepartmentModal, AddDesignationModal, AddRoleModal } from './AddEmployeeModals'
import { CustomModal } from '../../../../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployee, getDesignation, getRole, selectAllDepartment, selectAllDesignation, selectAllRole } from '../../../../Store/CustomSlice/EmployeeSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { CustomPageFormSubTitle } from '../../../../components/CustomPageTitle'
import { getNotification } from '../../../../Store/CustomSlice/NotificationSlice'


export const AddEmployeeForm = ({ formname, FormExternalClose, formReset, updateEmployeeRecord, updatetrigger }) => {


    // ----- Define Form
    const [form] = Form.useForm();

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ====== Trigger to reset location name & head modal =======
    const [trigger, setTrigger] = useState(0)



    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [joinDate, setJoinDate] = useState(dayjs().format('YYYY-MM-DD'));

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRole());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDesignation());
    }, [dispatch]);

    const FormExternalClosee = () => {
        handleOk();
    }

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ===== Modal Functions End =====

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    const gender = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
        {
            label: "Others",
            value: "others"
        }
    ]

    const maritalstatus = [
        {
            label: "Single",
            value: "single"
        },
        {
            label: "Married",
            value: "married"
        },
        {
            label: "Others",
            value: "others"
        }
    ]


    useEffect(() => {
        if (updateEmployeeRecord) {
            SetEmployeeDetails()
        }

    }, [updateEmployeeRecord, updatetrigger ])

    const SetEmployeeDetails = () => {
        form.setFieldsValue(updateEmployeeRecord)
        const dateOfBirth = new Date(updateEmployeeRecord?.dob);
        const dateOfJoining = new Date(updateEmployeeRecord?.date_of_joining);
        const dateFormat = 'YYYY/MM/DD';
        const dobirth = dayjs(dateOfBirth).format(dateFormat);
        const dateofjoining = dayjs(dateOfJoining).format(dateFormat);

        form.setFieldsValue({
            dob: dayjs(dobirth, dateFormat),
            companyName: updateEmployeeRecord?.company_name,
            firstName: updateEmployeeRecord?.first_name,
            lastName: updateEmployeeRecord?.last_name,
            phoneNumber: updateEmployeeRecord?.phone_number,
            roleId: updateEmployeeRecord?.role_id,
            designationId: updateEmployeeRecord?.designation_id,
            departmentId: updateEmployeeRecord?.department_id,
            bankName: updateEmployeeRecord?.bank_name,
            branchName: updateEmployeeRecord?.branch_name,
            accountNumber: updateEmployeeRecord?.account_number,
            holderName: updateEmployeeRecord?.holder_name,
            ifseCode: updateEmployeeRecord?.ifse_code,
            dateOfJoining: dayjs(dateofjoining, dateFormat),
        })
    }

    const AllRoles = useSelector(selectAllRole);

    const roleList = AllRoles?.map((value) => (
        {
            label: value.roleName,
            value: value.roleId
        }
    ))

    const AllDesignation = useSelector(selectAllDesignation);

    const designationList = AllDesignation?.map((value) => (
        {
            label: value.designationName,
            value: value.designationId
        }
    ))

    const AllDepartment = useSelector(selectAllDepartment)

    const departmentList = AllDepartment?.map((value) => (
        {
            label: value.departmentName,
            value: value.departmentId
        }
    ))

    const handleRoleButtonClick = () => {
        setModalTitle('Add Role')
        setModalContent(<AddRoleModal FormExternalClosee={FormExternalClosee} trigger={trigger} />)
        showModal()
    }

    const handleDesignationButtonClick = () => {
        setTrigger(trigger + 1)
        setModalTitle('Add Designation')
        setModalContent(<AddDesignationModal FormExternalClosee={FormExternalClosee} />)
        showModal()
    }

    const handleDepartmentButtonClick = () => {
        setTrigger(trigger + 1)
        setModalTitle('Add Department')
        setModalContent(<AddDepartmentModal FormExternalClosee={FormExternalClosee} />)
        showModal()
    }

    const handleRoleChange = (e) => {

    }

    const handleDesignationChange = () => {

    }

    const handleDepartmentChange = () => {

    }

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (e) => {
        setSelectedDate(e);
    };

    const handleJoinChange = (e) => {
        setJoinDate(e);
    };

    const UpdateEmployee = (values) => {
        request.put(`employees/edit/${updateEmployeeRecord?.employee_id}`, values)
            .then(function (response) {
                dispatch(getAllEmployee());
                dispatch(getNotification())
                FormExternalClose();
                form.resetFields();
                toast.info('Employee Details Updated Successfully')
            })
            .catch(error => {})
    }



    const AddEmployee = (values) => {
        request.post('employees/save', values)
            .then(function (response) {
                dispatch(getAllEmployee());
                dispatch(getNotification())
                FormExternalClose();
                form.resetFields();
                toast.success('Employee Details Added Successfully')
            })

            .catch(error => {})
    }

    const onFinish = (values) => {
        const newValues = { ...values, date: selectedDate, dateOfJoining: joinDate }
        if (updateEmployeeRecord) {
            UpdateEmployee(newValues);
        }
        else {
            AddEmployee(newValues);
        }
    };
    const onFinishFailed = (errorInfo) => {
    };

    return (
        <Form
            form={form}
            name={formname}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow space={[12, 12]}>
                <Col span={24} md={12}>
                    <CustomInput label={'First Name'} placeholder={'First Name'} name={'firstName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Employee Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Last Name'} placeholder={'Last Name'} name={'lastName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Employee Name !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'Email ID'} placeholder={'Enter EmailID'} name={'email'} type={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Email ID !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Gender'} name={'gender'} placeholder={'Enter Gender'} options={gender}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Gender !',
                            }
                        ]} />
                </Col>


                <Col span={24} md={12}>
                    <CustomInputNumber
                        label={'Phone Number'}
                        name={'phoneNumber'}
                        placeholder={'Phone Number'}
                        maxLength={10}
                        minLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date Of Birth'}
                        name={'dob'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date of Birth !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date Of Joining'}
                        name={'dateOfJoining'}
                        onChange={handleJoinChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date Of Joining !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'City'} name={'city'} placeholder={'Enter City'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter City !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'State'} name={'state'} placeholder={'Enter State'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter State !',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomSelect label={'Marital Status'} name={'marital'} placeholder={'Enter Marital Status'} options={maritalstatus}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Marital Status !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Country !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Work Experience'} name={'experience'} placeholder={'Enter Work Experience'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Work Experience !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect
                        label={'Role'}
                        placeholder={'Select Role'}
                        name={'roleId'}
                        onButtonClick={handleRoleButtonClick}
                        onChange={handleRoleChange}
                        options={roleList}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Role !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Enter Description'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Description !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Enter Address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Address !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect
                        label={'Designation'}
                        placeholder={'Select Designation'}
                        name={'designationId'}
                        onButtonClick={handleDesignationButtonClick}
                        onChange={handleDesignationChange}
                        options={designationList}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Designation !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect
                        label={'Department'}
                        placeholder={'Select Department'}
                        name={'departmentId'}
                        onButtonClick={handleDepartmentButtonClick}
                        onChange={handleDepartmentChange}
                        options={departmentList}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Department !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={24}>
                    <CustomPageFormSubTitle Heading={'BANK DETAILS :'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Bank Name'} name={'bankName'} placeholder={'Enter Bank Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Bank Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Branch Name'} name={'branchName'} placeholder={'Enter Branch Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Branch Name !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInputNumber label={'Account Number'} name={'accountNumber'} placeholder={'Enter Account Number'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Account Number !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'Account Holder Name'} name={'holderName'} placeholder={'Enter Account Holder Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Account Holder Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'IFSC Code'} name={'ifseCode'} placeholder={'Enter IFSC Code'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter IFSC Code !',
                            }
                        ]}
                    />
                </Col>


            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateEmployeeRecord ? (
                    <>
                        <Button.Primary text={'Update'} htmlType={'submit'} />
                        <Button.Danger text={'Cancel'} onClick={() => FormExternalClose()} />
                    </>
                ) : (
                    <>
                        <Button.Success text={'Submit'} htmlType={'submit'} />
                        <Button.Danger text={'Reset'} onClick={() => onReset()} />
                    </>
                )}
            </Flex>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={600} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}
