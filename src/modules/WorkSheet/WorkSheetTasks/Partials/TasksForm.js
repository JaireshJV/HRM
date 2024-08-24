import React, { useEffect, useState } from 'react'
import { Col, Form } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomInput } from '../../../../components/Form/CustomInput'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'

export const TaskForm = ({ FormExternalClose, formReset, formname }) => {

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [form] = Form.useForm();      // ----- Define Form

    useEffect(() => {
        form.resetFields();
    }, [form,formReset])

    const AssignedTo = [
        {
            label: "Employee 1",
            value: "employee_1"
        },
        {
            label: "Employee 2",
            value: "employee_2"
        },
    ]

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    // ===== Modal Functions End =====

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        FormExternalClose();
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    <CustomSelect label={'Project Title'} options={AssignedTo} name={'project_title'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Assigned To'} options={AssignedTo} name={'employee_name'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Start Date'}
                        name={'start_date'}
                        value={selectedDate}
                        onChange={handleOnChange}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'End Date'}
                        name={'end_date'}
                        value={selectedDate}
                        onChange={handleOnChange}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Modules'} name={'modules'} placeholder={'Modules'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Duration'} name={'total_duration'} placeholder={'Total Duration'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Description'} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                <Button.Success text={'Submit'} htmlType={'submit'} />
                <Button.Danger text={'cancel'} onClick={() => onReset()} />
            </Flex>

        </Form>
    )
}
