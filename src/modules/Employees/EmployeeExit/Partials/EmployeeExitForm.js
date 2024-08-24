import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { useForm } from 'antd/es/form/Form'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import dayjs from 'dayjs'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { getExit } from "../../../../Store/CustomSlice/SecondemployeeSlice"
import { useDispatch, useSelector } from 'react-redux'
import { CustomInput } from '../../../../components/Form/CustomInput'


export const EmployeeExitForm = ({ FormExternalClose, formReset, formname, updaterecord, updatetrigger }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const [form] = useForm()
    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        if (updaterecord) {
            SetExit()
        }
    }, [updaterecord, updatetrigger])
    
    const SetExit = () => {
        const Datee = new Date(updaterecord?.date)
        const dateFormat = 'YYYY-MM-DD';
        const Dateee = dayjs(Datee).format(dateFormat);
        const fullName = `${updaterecord?.first_name} ${updaterecord?.last_name}`;

        form.setFieldsValue(updaterecord)
        form.setFieldsValue({
            employee_name: fullName,
            date: dayjs(Dateee, dateFormat),
            employeeId: updaterecord?.employee_id
        })
    }

    const EmployeeDetails = useSelector(selectAllEmployee)

    const onReset = () => {
        form.resetFields()
    }

    const handleOnChanges = (value) => {

        const SelectedExitDetails = EmployeeDetails.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectedExitDetails) {
            form.setFieldsValue({ employeeId: SelectedExitDetails.employee_id });
        }
    };


    const Exitname = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const AddExitEmployee = (values) => {
        request.post('employeeexit/save', values)
            .then(function (response) {
                toast.success("Employee Exited Successfully !");
                dispatch(getExit());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const UpdateExitEmployee = (values) => {
        request.put(`employeeexit/edit/${updaterecord?.employee_exit_id}`, values)
            .then(function (response) {
                toast.info("Employee Exit Updated Successfully !");
                dispatch(getExit());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const onFinish = (values) => {
        const NewValues = { ...values, date: selectedDate }
        if (updaterecord) {
            UpdateExitEmployee(values)
        }
        else {
            AddExitEmployee(NewValues);
        }
    }

    const onFinishFailed = (errorInfo) => {
    }

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
                    <CustomSelect label={'Employee Name'} options={Exitname} name={'employee_name'} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Employee Name !',
                            }
                        ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date Of Exit'}
                        name={'date'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date of Exit !',
                            }
                        ]} />
                </Col>
                {/* 
                <Col span={24} md={12}>
                    <CustomInput label={'Status'} name={'status'} placeholder={'Status'} />
                </Col> */}

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Description'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Description !',
                            }
                        ]} />
                </Col>

            </CustomRow>

            <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
                {updaterecord ? (
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

        </Form>
    )
}
