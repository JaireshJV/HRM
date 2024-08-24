import React, { useEffect, useState } from 'react'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { CustomInput } from '../../../components/Form/CustomInput'
import { CustomRow } from '../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../components/Form/CustomInputNumber'
import { CustomAddSelect } from '../../../components/Form/CustomAddSelect'
import CustomerAndClientModal from './CustomerAndClientModal'
import { CustomModal } from '../../../components/CustomModal'
import request from '../../../utils/request'
import { toast } from 'react-toastify'
import { getCustomer, getFormtype, selectAllFormtype } from '../../../Store/CustomSlice/CustomerSlice'
import { useDispatch, useSelector } from 'react-redux'

export const CustomerAndClientForm = ({ formname, FormExternalClose, formReset, updatecustomer, clienttrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    //=========Modal title and content ============//
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formTypeID, setFormTypeID] = useState()
    const [trigger, settrigger] = useState(0)

    const AllFormTypeName = useSelector(selectAllFormtype)

    useEffect(() => {
        form.setFieldsValue({ formTypeId: formTypeID });
    }, [formTypeID, form])

    useEffect(() => {
        form.resetFields();
    }, [formReset, form])

    useEffect(() => {
        dispatch(getFormtype());
    }, [dispatch]);

    useEffect(() => {
        if (updatecustomer) {
            SetCustomer()
        }
    }, [updatecustomer, clienttrigger])

    const SetCustomer = () => {
        const Datee = new Date(updatecustomer?.date)
        const dateFormat = 'YYYY-MM-DD';
        const Dateee = dayjs(Datee).format(dateFormat);

        form.setFieldsValue(
            updatecustomer
        )
        form.setFieldsValue({
            date: dayjs(Dateee, dateFormat),
            phoneNo1: updatecustomer?.phone_no1,
            phoneNo2: updatecustomer?.phone_no2,
            formType: updatecustomer?.form_type_name,
            formTypeId: updatecustomer?.form_type_id
        })
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }
    const FormExternalClosee = () => {
        handleOk();
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const AddCustomerAndClient = (values) => {
        request.post('customers/save', values)
            .then(function (response) {
                toast.success("Customer and Client Details Saved Successfully !");
                dispatch(getCustomer());
                FormExternalClose();
                form.resetFields();

            })
            .catch(error => { })
    }

    const UpdateCustomerAndClient = (values) => {
        request.put(`customers/edit/${updatecustomer?.customer_id}`, values)
            .then(function (response) {
                toast.info("Customer and Client Details Updated Successfully !");
                dispatch(getCustomer());
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => { })
    }

    const gender = [
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

    const formtypeoptions = AllFormTypeName?.map((typename) => ({

        label: typename.formTypeName,
        value: typename.formTypeName
    }))

    const onReset = () => {
        form.resetFields();
    };

    const handleButtonClick = () => {
        settrigger(trigger+1)
        setModalTitle('Add Referal');
        setModalContent(<CustomerAndClientModal formname={'referal'} FormExternalClosee={FormExternalClosee} trigger={trigger} />);
        showModal()
    }

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const handleOnChanges = (e) => {
        const SelectedFormType = AllFormTypeName?.find((item) => item.formTypeName === e)
        setFormTypeID(SelectedFormType.formTypeId)
    }

    const onFinish = (values) => {
        const NewValue = { ...values, date: selectedDate }
        const NewValues = { ...values, date: selectedDate }

        if (updatecustomer) {
            UpdateCustomerAndClient(NewValues)
        }
        else {
            AddCustomerAndClient(NewValue)
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.error('Please Fill The Details');
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
                    <CustomInput label={'Name'} placeholder={'Enter Name'} name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Title !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Gender'} name={'gender'} placeholder={'Enter Gender'} options={gender}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Gender !',
                            }
                        ]} />
                </Col>


                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number 1'} name={'phoneNo1'} placeholder={'Phone Number 1'}
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
                                message: 'Please enter Phone Number 1 !',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number 2'} name={'phoneNo2'} placeholder={'Phone Number 2'}
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
                    //         message: 'Please enter Phone Number 2 !',
                    //     },
                    // ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Email ID'} placeholder={'Enter EmailID'} name={'email'} type={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Title !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'date'}
                        onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'City'} name={'city'} placeholder={'Enter City'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter City !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'State'} name={'state'} placeholder={'Enter State'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter State !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Country !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Enter Address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Address !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect label={'Referal'} options={formtypeoptions} name={'formType'} onButtonClick={handleButtonClick} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Form Type !',
                            }
                        ]}
                    />
                    <CustomInput name={'formTypeId'} display={'none'} />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updatecustomer ? (
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

            <CustomModal isVisible={isModalOpen} width={600} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}
