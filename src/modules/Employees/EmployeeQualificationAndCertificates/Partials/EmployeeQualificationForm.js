import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomUpload } from '../../../../components/Form/CustomUpload'
import { selectAllEmployee, getEmployee, getQualification } from '../../../../Store/CustomSlice/EmployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { base } from '../../../../utils/request'
import styled from 'styled-components'

const CustomUploadPdf = styled(CustomUpload)`
   cursor: pointer;
    padding: 20px;
    align-items: center;
    justify-content: left;
    height: 100%;
    text-align: center;


`

export const EmployeeQualificationForm = ({ formname, FormExternalClose, formReset, record }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const [ImageInitialValue, setImageInitialValue] = useState({});
    // const [employeeAdded, setEmployeeAdded] = useState(false); // Track whether an employee is added

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEmployee())
    }, [dispatch, formReset])

    useEffect(() => {
        if (record) {
            const awardsPhotoUrls = {
                aadharcard: [{
                    uid: 1,
                    name: `${record.firstName}Aadhar`,
                    status: 'done',
                    url: `${base}${record.aadharUrl}`
                }],
                pancard: [{
                    uid: 2,
                    name: `${record.firstName}PanCard`,
                    status: 'done',
                    url: `${base}${record.pannoUrl}`
                }],
                bankbook: [{
                    uid: 3,
                    name: `${record.firstName}BankBook`,
                    status: 'done',
                    url: `${base}${record.bankBookUrl}`
                }],
                Degree: [{
                    uid: 4,
                    name: `${record.firstName}DegreeCertificate`,
                    status: 'done',
                    url: `${base}${record.degreeUrl}`
                }],
                Photo: [{
                    uid: 5,
                    name: `${record.firstName}Photo`,
                    status: 'done',
                    url: `${base}${record.photourl}`
                }],
                Tenth: [{
                    uid: 6,
                    name: `${record.firstName}10thCertificate`,
                    status: 'done',
                    url: `${base}${record.aadharUrl}`
                }],
                Twelveth: [{
                    uid: 7,
                    name: `${record.firstName}12thCertificate`,
                    status: 'done',
                    url: `${base}${record.twelveUrl}`
                }],
                Resume: [{
                    uid: 8,
                    name: `${record.firstName}Resume`,
                    status: 'done',
                    url: `${base}${record.resumeurl}`
                }],

            }
            setImageInitialValue(awardsPhotoUrls)
        }

    }, [record])

    useEffect(() => {
        if (record) {
            form.setFieldsValue({ employee_name: record.firstName })
            form.setFieldsValue({ employeeId: record.employeeId })
            form.setFieldsValue({ highestQualification: record.highestQualification })
            form.setFieldsValue({ aadharNO: record.aadharno })
            form.setFieldsValue({ panCard: record.pancard })
            form.setFieldsValue({ aadhar: ImageInitialValue.aadharcard })
            form.setFieldsValue({ panno: ImageInitialValue.pancard })
            form.setFieldsValue({ degree: ImageInitialValue.Degree })
            form.setFieldsValue({ photo: ImageInitialValue.Photo })
            form.setFieldsValue({ bankBook: ImageInitialValue.bankbook })
            form.setFieldsValue({ ten: ImageInitialValue.Tenth })
            form.setFieldsValue({ twelve: ImageInitialValue.Twelveth })
            form.setFieldsValue({ resume: ImageInitialValue.Resume })
        }
    }, [record, ImageInitialValue, formReset, form])

    const AllEmployee = useSelector(selectAllEmployee)

    const EmpName = AllEmployee.map((name => ({
        label: `${name.first_name} ${name.last_name}`,
        value: `${name.first_name} ${name.last_name}`
    })))
    console.log(EmpName, "EmpNamejjjj");

    const handleNameChange = (name) => {
        const SelectedEmployeeDetails = AllEmployee?.find((item) => `${item.first_name} ${item.last_name}` === name)
        form.setFieldsValue({ employeeId: SelectedEmployeeDetails?.employee_id })
    }

    // const handleNameChange = (name) => {
    //     if (!employeeAdded) {
    //         const SelectedEmployeeDetails = AllEmployee?.find((item) => `${item.first_name} ${item.last_name}` === name);
    //         form.setFieldsValue({ employeeId: SelectedEmployeeDetails?.employee_id });
    //     } else {
    //         toast.warning('Employee is already added.');
    //     }
    // };

    const onReset = () => {
        form.resetFields();
    };

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const AddEmployeeQualifications = (values) => {
        request
            .post('qualification/save', values, config)
            .then(function (response) {
                toast.success('Employee Qualification Saved Successfully !');
                dispatch(getQualification());
                FormExternalClose();
                form.resetFields();
                // setEmployeeAdded(true);
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
    };

    const UpdateEmployeeQualifications = (values) => {
        request.put(`qualification/update/${record.qualificationId}`, values, config)
            .then(function (response) {
                console.log(response, "loggggggggggggggg");
                toast.info("Employee Qualification Updated Successfully !");
                dispatch(getQualification());
                FormExternalClose();
                // form.resetFields();
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
        const formData = new FormData();

        formData.append('highestQualification', values?.highestQualification);
        formData.append('aadharNO', values?.aadharNO);
        formData.append('employeeId', values?.employeeId);
        formData.append('panCard', values?.panCard);

        values.aadhar.forEach((file) => {
            formData.append(`aadhar`, file.originFileObj || '');
        });
        values.panno.forEach((file) => {
            formData.append(`panno`, file.originFileObj || '');
        });
        values.resume.forEach((file) => {
            formData.append(`resume`, file.originFileObj || '');
        });
        values.degree.forEach((file) => {
            formData.append(`degree`, file.originFileObj || '');
        });
        values.photo.forEach((file) => {
            formData.append(`photo`, file.originFileObj || '');
        });
        values.bankBook.forEach((file) => {
            formData.append(`bankBook`, file.originFileObj || '');
        });
        values.ten.forEach((file) => {
            formData.append(`ten`, file.originFileObj || '');
        });
        values.twelve.forEach((file) => {
            formData.append(`twelve`, file.originFileObj || '');
        });


        if (record) {
            UpdateEmployeeQualifications(formData)
        } else {
            AddEmployeeQualifications(formData)
        }
        console.log(formData, 'formDatalllll');
    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <Fragment>
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
                        <CustomSelect label={'Employee Name'} placeholder={"Enter Employee Name"} options={EmpName} onChange={handleNameChange} name={'employee_name'} rules={[
                            { required: true, message: 'Please Enter Details!' }
                        ]} />
                        <CustomInput name={'employeeId'} display={'none'} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'Highest Qualification'} name={'highestQualification'} placeholder={'Enter Highest Qualification'} rules={[
                            { required: true, message: 'Please Enter Details!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Aadhar Card Number'} name={'aadharNO'} placeholder={'Enter Aadhar Number'} rules={[
                            { required: true, message: 'Please Enter Details!' }
                        ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Pan Card Number'} name={'panCard'} placeholder={'Enter Pan Number'} rules={[
                            { required: true, message: 'Please Enter Details!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Aadhar Card Here'} name={'aadhar'} rules={[
                            { required: true, message: 'Please Enter Details!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Pan Card Here'} name={'panno'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>

                        <CustomUploadPdf form={form} listType='text' maxCount={1} label={'Upload Resume Here'} name={'resume'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Degree Certificate Here'} name={'degree'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Photo Here'} name={'photo'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Bank Passbook Here'} name={'bankBook'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload 10th Certificate Here'} name={'ten'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload 12th Certificate Here'} name={'twelve'} rules={[
                            { required: true, message: 'Please Upload Image!' }
                        ]} />
                    </Col>

                </CustomRow>
                <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                    {record ? (
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
        </Fragment>


    )
}
