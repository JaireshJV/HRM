import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAllPayrollType, getPayroll, getPayrollType } from '../../../../Store/CustomSlice/PayrollSlice'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect'
import { PayrollModal } from './PayrollModal'
import { CustomModal } from '../../../../components/CustomModal'

export const PayrollForm = ({ formname, FormExternalClose, formReset, updateRecord, trigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [dataSource, setDataSource] = useState([]);
    const [employeeID, setEmployeeID] = useState([])


    //=========Modal title and content ============//
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        dispatch(getPayroll());
        dispatch(getPayrollType());
        dispatch(getEmployee());

    }, [dispatch]);


    useEffect(() => {
        form.setFieldsValue({
            employeeId: employeeID?.employee_id,
            account_number: employeeID?.account_number,
            phone_number: employeeID?.phone_number
        },)
    }, [employeeID,form])

    useEffect(() => {
        if (updateRecord) {
            SetPaymentDetails()
        }
    }, [updateRecord, formReset])

    const SetPaymentDetails = () => {
        form.setFieldsValue(updateRecord)
        const PayDate = new Date(updateRecord?.date);
        const dateFormat = 'YYYY/MM/DD';
        const PaymentDate = dayjs(PayDate).format(dateFormat);
        const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;

        form.setFieldsValue({
            employee_name: fullName,
            totalDeductions: updateRecord?.total_deductions,
            date: dayjs(PaymentDate, dateFormat),
            currentSalary: updateRecord?.current_salary,
            totalSalary: updateRecord?.total_salary,
            paymentType: updateRecord?.payment_type,
            noOfDaysWorkingInaMonth: updateRecord?.no_of_days_working_ina_month,
            employeeId: updateRecord?.employee_id,
            paymentTypeId: updateRecord?.payment_type_id,
        })
    }

    const payrollType = useSelector(SelectAllPayrollType)

    useEffect(() => {
        setDataSource(payrollType)
    }, [payrollType])

    const PaymentDetails = useSelector(selectAllEmployee)
  
    const handleNameChange = (value) => {
        const SelectedPaymentDetails = PaymentDetails?.find((item) => `${item.first_name} ${item.last_name}` === value)
        setEmployeeID(SelectedPaymentDetails)
    }

    const Paymentname = PaymentDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));


    const Paymenttype = dataSource?.map((com) => ({ label: com.paymentType, value: com.paymentType }))

    const handleOnChanges = (value) => {
        const SelectedPayment = dataSource?.find((mem) => mem.paymentType === value)
        form.setFieldsValue({ paymentTypeId: SelectedPayment?.paymentTypeId })
    }

    const onReset = () => {
        form.resetFields();
    };

    const FormExternalClosee = () => {
        handleOk();
    }

    const handleOnChange = (e) => {
        setSelectedDate(e);
    };

    const UpdatePayroll = (values) => {
        request.put(`payroll/editpayroll/${updateRecord?.pay_roll_id}`, values)
            .then(function (response) {
                dispatch(getPayroll());
                FormExternalClose();
                form.resetFields();
                toast.info('Payroll Updated Successfully')
            })
            .catch(error => {})
    }


    const AddPayroll = (values) => {
        request.post('payroll/save', values)
            .then(function (response) {
                toast.success('Payroll Added Successfully');
                dispatch(getPayroll())
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleButtonClick = () => {
        setModalTitle('Add Payment Type');
        setModalContent(<PayrollModal FormExternalClosee={FormExternalClosee} formname={'Add Payment Type Form'} handleOk={handleOk} />);
        showModal()
    }

    const onFinish = (values) => {
        const newValues = { ...values, date: selectedDate }
        if (updateRecord) {
            UpdatePayroll(newValues);
        }
        else {
            AddPayroll(newValues);
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
                    <CustomSelect label={'Employee Name'} options={Paymentname} name={'employee_name'} onChange={handleNameChange} rules={[
                        {
                            required: true,
                            message: 'Please enter Employee Name !',
                        }
                    ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Account Number'} name={'account_number'} placeholder={'Account Number'} disabled={'true'} rules={[
                        {
                            required: true,
                            message: 'Please enter Account Number !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number'} name={'phone_number'} placeholder={'Phone Number'} disabled={'true'} rules={[
                        {
                            required: true,
                            message: 'Please enter Phpne Number !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Deductions'} name={'totalDeductions'} placeholder={'Total Deductions'} rules={[
                        {
                            required: true,
                            message: 'Please enter Total Deductions !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'date'}
                        onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]}
                    />
                </Col>

                {/* <Col span={24} md={12}>
                    <CustomInputNumber label={'Current Salary'} name={'currentSalary'} placeholder={'Current Salary'} />
                </Col> */}

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Salary'} name={'totalSalary'} placeholder={'Total Salary'} rules={[
                        {
                            required: true,
                            message: 'Please enter Total Salary !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Allowance'} name={'allowance'} placeholder={'Allowance'} rules={[
                        {
                            required: true,
                            message: 'Please enter Allowance !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect label={'Payment Type'} options={Paymenttype} name={'paymentType'} onButtonClick={handleButtonClick} onChange={handleOnChanges} rules={[
                        {
                            required: true,
                            message: 'Please enter Payment Type !',
                        }
                    ]} />
                    <CustomInput name={'paymentTypeId'} display={'none'} />
                </Col>

                {/* <Col span={24} md={12}>
                    <CustomInputNumber label={'No of working days in a month'} name={'noOfDaysWorkingInaMonth'} placeholder={'No.of.Working days'} rules={[
                        {
                            required: true,
                            message: 'Please enter Working Days !',
                        }
                    ]} />
                </Col> */}

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateRecord ? (
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
            <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}
