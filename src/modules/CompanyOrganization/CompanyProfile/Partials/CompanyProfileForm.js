import React, { useEffect } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomPageFormSubTitle } from '../../../../components/CustomPageTitle'
import request from '../../../../utils/request'
import { getCompany } from '../../../../Store/CustomSlice/CompanySlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export const CompanyProfileForm = ({ formname, FormExternalClose, formReset, updatecompanyrecord, updatetrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        SetCompanyDetails()
    }, [updatecompanyrecord, updatetrigger])

    const SetCompanyDetails = () => {
        form.setFieldsValue(updatecompanyrecord)
    }

    const onReset = () => {
        form.resetFields();
    };

    const AddCompany = (values) => {
        request.post('company/save', values)
            .then(function (response) {
                toast.success(response.data);
                dispatch(getCompany());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const UpdateCompany = (values) => {
        request.put(`company/editCompany/${updatecompanyrecord?.companyId}`, values)
            .then(function (response) {
                toast.info('Company Profile Details Updated Successfully')
                dispatch(getCompany());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const onFinish = (values) => {
        if (updatecompanyrecord) {
            UpdateCompany(values);
        }
        else {
            AddCompany(values)
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.error('Please Fill The Details')
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
                    <CustomInput label={'Company Name'} placeholder={'Enter Company Name'} name={'companyName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Company Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Location'} name={'location'} placeholder={'Enter Location'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Location !',
                            },

                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Phone Number 1'} name={'phoneNumber1'}
                        placeholder={"Enter Your Phone no 1"}
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
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Phone Number 2'} name={'phoneNumber2'}
                        placeholder={"Enter Your Phone no 2"}
                        maxLength={10}
                        minLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please enter Phone Number !',
                        //     },
                        // ]} 
                        />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Email ID'} name={'email'} placeholder={'Enter Email ID'} type={"email"}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Email ID !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'GST Number'} style={{ textTransform: 'uppercase' }} name={'gstNo'} placeholder={'Enter G S T number'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter G S T number !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Tax Number'} name={'faxNo'} placeholder={'Enter Tax Number'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Tax Number !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'State'} name={'state'} placeholder={'Enter State'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter State !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Country !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Pincode'} name={'pincode'} placeholder={'Enter Pincode'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Pincode !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={24}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Enter Address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Address !',
                            }
                        ]}
                    />
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
                    <CustomInputNumber label={'Account Number'} name={'accountNo'} placeholder={'Enter Account Number'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Account Number !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'Account Holder Name'} name={'accountHolderName'} placeholder={'Enter Account Holder Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Account Holder Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'IFSC Code'} name={'ifscCode'} placeholder={'Enter IFSC Code'}
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
                {updatecompanyrecord ? (
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
