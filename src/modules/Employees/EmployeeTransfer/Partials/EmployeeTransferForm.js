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
import { getEmployee, getTransfer, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'

export const EmployeeTransferForm = ({ formname, FormExternalClose, formReset, transferrecord, transfertrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [employeeID, setEmployeeID] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        form.setFieldsValue({
            employeeId: employeeID?.employee_id,
            roleName: employeeID?.role_name,
            designationName: employeeID?.designation_name
        },)
    }, [employeeID,form])

    useEffect(() => {
        if (transferrecord) {
            SetTransfer();
        }
    }, [transferrecord, transfertrigger])

    const SetTransfer = () => {
        const Datee = new Date(transferrecord?.date)
        const dateFormat = 'YYYY-MM-DD';
        const Dateee = dayjs(Datee).format(dateFormat);

        form.setFieldsValue(transferrecord);
        form.setFieldsValue({
            date: dayjs(Dateee, dateFormat),
            designationName: transferrecord?.designation_name,
            roleName: transferrecord?.role_name,
            employee_name : transferrecord?.first_name,
            employeeId: transferrecord?.employee_id
        })
    }

    const EmployeeDetails = useSelector(selectAllEmployee)


    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const handleOnChanges = (value) => {
        const SelectedEmployeeDetails = EmployeeDetails?.find((item) => `${item.first_name} ${item.last_name}` === value)
        setEmployeeID(SelectedEmployeeDetails)
    }

    const EmployeeeName = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));


    const AddEmployeeTransfer = (values) => {
        request.post('transfer/save', values)
            .then(function (response) {
                toast.success("Employee Transfer Saved Successfully !");
                dispatch(getTransfer());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const UpdateEmployeeTransfer = (values) => {
        request.put(`transfer/edit/${transferrecord?.transfer_id}`, values)
            .then(function (response) {
                toast.info("Employee Transfer Details Updated Successfully !");
                dispatch(getTransfer());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const onFinish = (values) => {
        const NewValues = { ...values, date: selectedDate }
        if (transferrecord) {
            UpdateEmployeeTransfer(NewValues)
        }
        else {
            AddEmployeeTransfer(values)
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
                    <CustomSelect label={'Employee Name'} options={EmployeeeName} name={'employee_name'} onChange={handleOnChanges} />
                    <CustomInput name={'employeeId'} display={"none"} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Transfer To'} placeholder={'Enter Transfer to'} name={'location'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Transfer To !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'date'}
                        onChange={handleOnChange}
                        value={selectedDate} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Designation'} name={'designationName'} readOnly={'true'} disabled={true} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Role'} name={'roleName'} readOnly={'true'} disabled={true} />
                </Col>
                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Description'} />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {transferrecord ? (
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
