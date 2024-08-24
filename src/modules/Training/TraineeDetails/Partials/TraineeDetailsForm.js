import React, { useEffect } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import request from '../../../../utils/request'
import { useDispatch } from 'react-redux'
import { getTraining } from '../../../../Store/CustomSlice/TrainingSlice'
import { toast } from 'react-toastify'

export const TraineeDetailsForm = ({ formname, FormExternalClose, formReset, updateTraineerecord, updatetrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [form,formReset])

    const Gender = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
        {
            label: "Others",
            value: "others"
        }
    ]
    
    useEffect(() => {
        SetTraineeDetails()
    }, [updateTraineerecord, updatetrigger ])

    const SetTraineeDetails = () => {
        form.setFieldsValue({
            name: updateTraineerecord?.name,
            phoneNumber: updateTraineerecord?.phoneNumber,
            address: updateTraineerecord?.address,
            email: updateTraineerecord?.email,
            country: updateTraineerecord?.country,
            gender: updateTraineerecord?.gender,
            state: updateTraineerecord?.state,
            location: updateTraineerecord?.location,
        })
    }

    const AddTraining = (values) => {
        request.post('traineeDetails/save', values)
            .then(function (response) {
                dispatch(getTraining());
                FormExternalClose();
                form.resetFields();
                toast.info('training Details Added Successfully')
            })
            .catch(error => {})
    }

    const onReset = () => {
        form.resetFields();
    };

    const UpdateTrainee = (values) => {
        request.put(`TraineeDetails/editTraineeDetails/${updateTraineerecord?.traineeDetailsId}`, values)
            .then(function (response) {
                dispatch(getTraining());
                FormExternalClose();
                form.resetFields();
                toast.info('Training Details Updated Successfully')
            })
            .catch(error => {})
    }

    const onFinish = (values) => {
        if (updateTraineerecord) {
            UpdateTrainee(values);
            FormExternalClose();
            form.resetFields();
        }
        else {
            AddTraining(values);
            FormExternalClose();
            form.resetFields();
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
                    <CustomInput label={'Name'} placeholder={'Name'} name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number'} placeholder={'Phone Number'} name={'phoneNumber'}
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
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Gender'} options={Gender} name={'gender'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter gender !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Location'} placeholder={'Location'} name={'location'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Location !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'State'} placeholder={'State'} name={'state'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter State !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'Country'} placeholder={'Country'} name={'country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Country !',
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInput label={'Email ID'} placeholder={'Email ID'} name={'email'} type={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Email ID !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Address !',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateTraineerecord ? (
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
