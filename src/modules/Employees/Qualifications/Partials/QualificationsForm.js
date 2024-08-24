import React, { useEffect } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomUpload } from '../../../../components/Form/CustomUpload'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'


export const QualificationForm = ({ formname, FormExternalClose, formReset }) => {

    const Employee = useSelector(selectAllEmployee);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployee())
    }, [dispatch])

    // ----- Define Form
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    const EmployeeNameOption = Employee.map((item) => (
        {
            label: `${item?.first_name} ${item.last_name}`,
            value: item?.first_name,
        }
    ))

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        // FormExternalClose();
        // form.resetFields();
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
                    <CustomSelect label={'Employee Name'} options={EmployeeNameOption} name={'employee_name'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Highest Qualification'} name={'highest_qualification'} placeholder={'Enter Highest Qualification'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Aadhar Card Number'} name={'aadhar_cardno'} placeholder={'Enter Aadhar Number'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Pan Card Number'} name={'pan_cardno'} placeholder={'Enter Pan Number'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Aadhar Card Here'} name={'aadhar'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Pan Card Here'} name={'pan_card'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Resume Here'} name={'resume'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Degree Certificate Here'} name={'degree_certificate'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Photo Here'} name={'photo'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload Bank Passbook Here'} name={'bank_passbook'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload 10th Certificate Here'} name={'10th_certificate'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload listType='picture-card' maxCount={1} label={'Upload 12th Certificate Here'} name={'12th_certificate'} />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                <Button.Success text={'Save'} htmlType={'submit'} />
                <Button.Danger text={'cancel'} onClick={() => onReset()} />
            </Flex>
        </Form>
    )
}
