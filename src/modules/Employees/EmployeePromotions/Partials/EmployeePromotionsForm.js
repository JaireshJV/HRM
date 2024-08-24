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
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee, getPromotions, getRole, selectAllEmployee, selectAllRole } from '../../../../Store/CustomSlice/EmployeeSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'

export const EmployeePromotionsForm = ({ formname, FormExternalClose, formReset, updaterecord, updatetrigger }) => {
    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [employeeID, setEmployeeID] = useState([])
    const [employeeRoleID, setEmployeeRoleID] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset, form])

    useEffect(() => {
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        form.setFieldsValue({
            employeeId: employeeID?.employee_id,
            roleName: employeeID?.role_name,
        },)
    }, [employeeID, form])

    useEffect(() => {
        dispatch(getRole());
    }, [dispatch]);

    useEffect(() => {
        form.setFieldsValue({
            roleId: employeeRoleID?.roleId
        },)
    }, [employeeRoleID, form])

    useEffect(() => {
        if (updaterecord) {
            SetPromotions();
        }
    }, [updaterecord, updatetrigger])

    const SetPromotions = () => {
        const Datee = new Date(updaterecord?.date)
        const dateFormat = 'YYYY-MM-DD';
        const Dateee = dayjs(Datee).format(dateFormat);
        const fullName = `${updaterecord?.first_name} ${updaterecord?.last_name}`;

        form.setFieldsValue(updaterecord);
        form.setFieldsValue({
            firstName: fullName,
            date: dayjs(Dateee, dateFormat),
            PromotedTo: updaterecord?.role_name,
            promotionsBy: updaterecord?.promotions_by,
            roleName: updaterecord?.role_name,
            roleId: updaterecord?.role_id,
            employeeId: updaterecord?.employee_id,
        })
    }

    const EmployeeDetails = useSelector(selectAllEmployee)
    const EmployeeRoleDetails = useSelector(selectAllRole)

    const PromotedRoleOptions = EmployeeRoleDetails?.map((role) => ({

        label: role.roleName,
        value: role.roleName
    }))

    const handleOnChanges = (value) => {

        const SelectedEmployeeDetails = EmployeeDetails.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );
        setEmployeeID(SelectedEmployeeDetails)

        // if (SelectedEmployeeDetails) {
        //     form.setFieldsValue({ employeeId: SelectedEmployeeDetails.employee_id });
        // }
    };

    const EmployeeeName = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));


    const handleOnRoleChanges = (value) => {
        const SelectedEmployeeRoleDetails = EmployeeRoleDetails?.find((item) => item.roleName === value)
        setEmployeeRoleID(SelectedEmployeeRoleDetails)
    }

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const AddEmployeePromotions = (values) => {
        request.post('promotions/save', values)
            .then(function (response) {
                toast.success("Employee Promotion Saved Successfully !");
                dispatch(getPromotions());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => { })
    }

    const UpdateEmployeePromotions = (values) => {
        request.put(`promotions/edit/${updaterecord?.promotions_id}`, values)
            .then(function (response) {
                toast.info("Employee Promotions Details Updated Successfully !");
                dispatch(getPromotions());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => { })
    }

    const onFinish = (values) => {
        const NewValues = { ...values, date: selectedDate }
        if (updaterecord) {
            UpdateEmployeePromotions(NewValues);
        }
        else {
            AddEmployeePromotions(values)
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

                    <CustomSelect label={'Employee Name'} options={EmployeeeName} name={'firstName'} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Promoted By !',
                            }
                        ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Employee Role'} name={'roleName'} disabled={true} />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Role to be Promoted '} placeholder={'Enter Role to be promoted'} name={'PromotedTo'} options={PromotedRoleOptions} onChange={handleOnRoleChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Role to be promoted !',
                            }
                        ]}
                    />
                    <CustomInput name={'roleId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Promoted By'} placeholder={'Enter Promoted By'} name={'promotionsBy'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Promoted By !',
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
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Enter the Description'} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
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
