import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { LeaveTypeModal } from './EmployeeLeaveModals'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { getLeave, getLeaveType, selectAllLeavetype } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'


export const EmployeeLeaveForm = ({ FormExternalClose, formReset, formname, updateRecord }) => {

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataSource, setDataSource] = useState([]);

    //=========Modal title and content ============//
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [form] = useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        if (updateRecord) {
            SetResignationDetails()
        }
    }, [updateRecord])

    const SetResignationDetails = () => {
        form.setFieldsValue(updateRecord)
        const EmpLeaveDate = new Date(updateRecord?.date);
        const EmpToDate = new Date(updateRecord?.to_date);
        const dateFormat = 'YYYY/MM/DD';
        const EmpDate = dayjs(EmpLeaveDate).format(dateFormat);
        const ToDate = dayjs(EmpToDate).format(dateFormat);
        const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;

        form.setFieldsValue({
            employee_name: fullName,
            date: dayjs(EmpDate, dateFormat),
            toDate: dayjs(ToDate, dateFormat),
            employeeId: updateRecord?.employee_id,
            reason_for_leave: updateRecord?.reason,
            leaveType: updateRecord?.leave_type,
            leaveTypeId: updateRecord?.leave_type_id,
            totalDay: updateRecord?.total_day,
            approvedBy: updateRecord?.approved_by
        })
    }

    useEffect(() => {
        dispatch(getLeaveType())
        dispatch(getEmployee())
    }, [dispatch])

    useEffect(() => {
        dispatch(getLeave())
    }, [dispatch])


    const AllEmployeeLeave = useSelector(selectAllLeavetype)
    const EmployeeDetails = useSelector(selectAllEmployee)



    const EmployeeLeave = dataSource?.map((com) => ({ label: com.leaveType, value: com.leaveType }))


    const handleOnChanges = (value) => {
        const SelectedEmergencycontacts = dataSource?.find((mem) => mem.leaveType === value);
        form.setFieldsValue({ leaveTypeId: SelectedEmergencycontacts?.leaveTypeId });
    };

    const handleNameChange = (value) => {

        const SelectedEmployeeDetails = EmployeeDetails.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectedEmployeeDetails) {
            form.setFieldsValue({ employeeId: SelectedEmployeeDetails.employee_id });
        }
    };


    const EmployeeeName = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));

    useEffect(() => {
        setDataSource(AllEmployeeLeave)
    }, [AllEmployeeLeave])

    const handleFromChange = (e) => {
        setSelectedDate(e)
    };


    const handleOnChange = (e) => {
        setToDate(e)
    };

    const FormExternalClosee = () => {
        handleOk();
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

    const onReset = () => {
        form.resetFields()
    }

    const handleButtonClick = () => {
        setModalTitle('Add Leave Type');
        setModalContent(<LeaveTypeModal formname={'AddLeaveTypeForm'} FormExternalClosee={FormExternalClosee} />);
        showModal()
    }

    const UpdateLeave = (values) => {
        request.put(`employeeleave/edit/${updateRecord?.employee_leave_id}`, values)
            .then(function (response) {
                dispatch(getLeave());
                FormExternalClose();
                form.resetFields();
                toast.info('Employee Leave Updated Successfully')
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data) {
                            toast.warn(error.response.data)
                        }
                    } else {
                        toast.error('Invalid input.');
                    }
                }
                else {
                    toast.error('Failed')
                }
            })
    }


    const AddComplaint = (values) => {
        request.post('employeeleave/save', values)
            .then(function (response) {
                toast.success('Employee Leave Added Successfully');
                dispatch(getLeave())
                FormExternalClose();
                form.resetFields();
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data) {
                            toast.warn(error.response.data)
                        }
                    } else {
                        toast.error('Invalid input.');
                    }
                }
                else {
                    toast.error('Failed')
                }
            })
    }


    const onFinish = (values) => {
        const newValues = { ...values, date: selectedDate, toDate: toDate }
        if (updateRecord) {
            UpdateLeave(newValues);
        }
        else {
            AddComplaint(newValues);
        }
    };


    const onFinishFailed = (errorInfo) => {
    };


    return (
        <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            formname={formname}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <CustomRow space={[12, 12]}>

                <Col span={24} md={12}>
                    <CustomSelect label={'Employee Name'} options={EmployeeeName} name={'employee_name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Name !',
                            }
                        ]} onChange={handleNameChange} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect  label={'Leave Type'} name={'leaveType'} options={EmployeeLeave} onButtonClick={handleButtonClick} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Leave Type !',
                            }
                        ]} />
                    <CustomInput name={'leaveTypeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'From Date'}
                        name={'date'}
                        onChange={handleFromChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'To Date'}
                        name={'toDate'}
                        onChange={handleOnChange}
                        value={toDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]} />
                </Col>



                <Col span={24} md={12}>
                    <CustomInput label={'Approved By'} name={'approvedBy'} placeholder={'Approved By'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Approved By !',
                            }
                        ]} />
                </Col>



                <Col span={24} md={12}>
                    <CustomTextArea label={'Reason for Leave'} name={'reason'} placeholder={'Reason For Leave'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Reason for Leave !',
                            }
                        ]} />
                </Col>

            </CustomRow>

            <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
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
