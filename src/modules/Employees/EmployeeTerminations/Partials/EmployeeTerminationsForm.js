import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { getTermination } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { CustomInput } from '../../../../components/Form/CustomInput'

export const EmployeeTerminationsForm = ({ formname, FormExternalClose, formReset, updatetermination, updatetrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        if (updatetermination) {
            SetTermination();
        }
    }, [updatetermination, updatetrigger])

    const SetTermination = () => {
        const Datee = new Date(updatetermination?.terminations_date)
        const dateFormat = 'YYYY-MM-DD';
        const Dateee = dayjs(Datee).format(dateFormat);
        const fullName = `${updatetermination?.first_name} ${updatetermination?.last_name}`;

        form.setFieldsValue(updatetermination);
        form.setFieldsValue({
            employee_name: fullName,
            terminationsDate: dayjs(Dateee, dateFormat),
            terminationsType: updatetermination?.terminations_type,
            TerminationId: updatetermination?.terminations_id,
            employeeId: updatetermination?.employee_id,
        });
    }

    const EmployeeDetails = useSelector(selectAllEmployee)

    const AddTerminations = (values) => {
        request.post('terminations/save', values)
            .then(function (response) {
                toast.success("Employee Termination  Saved Successfully !");
                dispatch(getTermination());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const UpdateEmployeeTermination = (values) => {
        request.put(`terminations/edit/${updatetermination?.terminations_id}`, values)
            .then(function (response) {
                toast.info("Employee Termination Details Updated Successfully !");
                dispatch(getTermination());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const handleOnChanges = (value) => {

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


    const onFinish = (values) => {
        const NewValues = { ...values, terminationsDate: selectedDate }
        if (updatetermination) {
            UpdateEmployeeTermination(NewValues)
        }
        else {
            AddTerminations(values)
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
                    <CustomSelect label={'Employee Name'} options={EmployeeeName} name={'employee_name'} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Employee Name !',
                            }
                        ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                    <CustomInput name={'TerminationId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'terminationsDate'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the Termination Date !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Reason For Termination'} name={'terminationsType'} placeholder={'Reason For Termination'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Reason for Termination !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Enter Description'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Description !',
                            }
                        ]} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updatetermination ? (
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
