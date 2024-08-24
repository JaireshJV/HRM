import React, { useEffect, useState } from 'react'
import { Col, Form } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomInput } from '../../../../components/Form/CustomInput'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer, selectAllCustomer } from '../../../../Store/CustomSlice/CustomerSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { CustomMultiSelect } from '../../../../components/Form/CustomMultiSelect'
import { getDesignation, selectAllDesignation } from '../../../../Store/CustomSlice/EmployeeSlice'
import { getProject } from '../../../../Store/CustomSlice/ProjectSlice'

export const AddProjectForm = ({ FormExternalClose, formReset, formname, updaterecord }) => {
    console.log(updaterecord);

    const [fromDate, setFromDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [form] = Form.useForm();      // ----- Define Form
    const [clientID, setClientID] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [formReset, form])

    useEffect(() => {
        dispatch(getCustomer());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDesignation());
    }, [dispatch]);


    useEffect(() => {
        form.setFieldsValue({
            customerId: clientID?.customer_id,
            contact: clientID?.phone_no1,
            location: clientID?.city,
        },)
    }, [clientID, form])


    useEffect(() => {
        if (updaterecord) {
            SetProjectDetails()
        }
    }, [updaterecord, formReset])

    const SetProjectDetails = () => {
        console.log('lllll');
        const fromdatee = new Date(updaterecord?.fromDate)
        const Todatee = new Date(updaterecord?.toDate)
        const dateFormat = 'YYYY-MM-DD';
        const FrmDateee = dayjs(fromdatee).format(dateFormat);
        const ToDateee = dayjs(Todatee).format(dateFormat);
        form.setFieldsValue(updaterecord)
        form.setFieldsValue({
            fromDate: dayjs(FrmDateee, dateFormat),
            toDate: dayjs(ToDateee, dateFormat),
            designationId: updaterecord?.designationId,
            customerId: updaterecord?.customerId,
        })
    }

    const ClientDetails = useSelector(selectAllCustomer)
    const AllDesignation = useSelector(selectAllDesignation)

    const ClientNameOptions = ClientDetails?.map((customerdetails) => ({

        label: customerdetails.name,
        value: customerdetails.name
    }))

    const handleOnChanges = (value) => {
        const SelectedClientDetails = ClientDetails?.find((item) => item.name === value)
        setClientID(SelectedClientDetails)

    }

    const ClientNameOptionss = AllDesignation?.map((designationdetails) => ({

        label: designationdetails.designationName,
        value: designationdetails.designationId
    }))

    const ChangeProductId = (value) => {

    }


    const handleFromdate = (e) => {
        setFromDate(e)
    }

    const handleTodate = (e) => {
        setToDate(e)
    }


    // ===== Modal Functions End =====

    const onReset = () => {
        form.resetFields();
    };

    const UpdateProject = (values) => {
        request.put(`project/editproject/${updaterecord?.projectId}`, values)
            .then(function (response) {
                toast.info("Project Details Updated Successfully !");
                dispatch(getProject());
                FormExternalClose();
                form.resetFields();
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

    const AddProject = (values) => {
        request.post('project/save', values)
            .then(function (response) {
                toast.success("Project Details Saved Successfully !");
                dispatch(getProject());
                FormExternalClose();
                form.resetFields();
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
        const newValues = { ...values, fromDate: fromDate, toDate: toDate }
        if (updaterecord) {
            UpdateProject(newValues);
        }
        else {
            AddProject(newValues);
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
                    <CustomInput label={'Project Title'} name={'projectTitle'} placeholder={'Project Title'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Project Title !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Client Name'} name={'customerName'} options={ClientNameOptions} onChange={handleOnChanges}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Client Name !',
                            }
                        ]} />
                    <CustomInput name={'customerId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Contact'} name={'contact'} placeholder={'Contact'} disabled={true} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Location'} name={'location'} placeholder={'Location'} disabled={true} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Start Date'}
                        name={'fromDate'}
                        onChange={handleFromdate}
                        rules={[
                            {
                                required: true,
                                message: 'Please select Start Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'End Date'}
                        name={'toDate'}
                        onChange={handleTodate}
                        rules={[
                            {
                                required: true,
                                message: 'Please select End Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomMultiSelect
                        mode={'multiple'}
                        options={ClientNameOptionss}
                        label={'Assigned to'}
                        name={'designationId'}
                        maxTagCount={2}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the project to be Assigned to!',
                            },
                        ]} onChange={ChangeProductId} />
                    <CustomInput name={"designationId"} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Project Amount'} name={'totalProjectAmount'} placeholder={'Enter Total Amount'} rules={[
                        {
                            required: true,
                            message: 'Please select Total Project Amount !',
                        }
                    ]} />
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