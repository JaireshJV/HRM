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
import { getEmployee, getResignation, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'


export const EmployeeResignationForm = ({ formname, FormExternalClose, formReset, updateRecord, updatetrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const [resigDate, setResigDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [fromDate, setFromDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [toDates, setToDate] = useState(dayjs().format('YYYY-MM-DD'))

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])


    useEffect(() => {
        if (updateRecord) {
            SetResignationDetails()
        }
    }, [updateRecord])

    const SetResignationDetails = () => {
        const ResigDate = new Date(updateRecord?.resignations_date);
        const frommDate = new Date(updateRecord?.notice_date);
        const tooDate = new Date(updateRecord?.to_date);
        const dateFormat = 'YYYY/MM/DD';
        const Resignationdate = dayjs(ResigDate).format(dateFormat);
        const fromDate = dayjs(frommDate).format(dateFormat);
        const toDate = dayjs(tooDate).format(dateFormat);
        const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;

        form.setFieldsValue({
            employee_name: fullName,
            resignationsDate: dayjs(Resignationdate, dateFormat),
            noticeDate: dayjs(fromDate, dateFormat),
            toDate: dayjs(toDate, dateFormat),
            reason: updateRecord?.reason,
            employeeId: updateRecord.employee_id
        })
    }

    useEffect(() => {
        dispatch(getEmployee())
    }, [dispatch])

    const AllResignation = useSelector(selectAllEmployee)


    const onReset = () => {
        form.resetFields();
    };

    const handleOnChangename = (value) => {

        const SelectName = AllResignation.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectName) {
            form.setFieldsValue({ employeeId: SelectName.employee_id });
        }
    };


    const Resig = AllResignation?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));

    const onFinish = (values) => {
        const newValues = { ...values, Resignationdate: resigDate, fromDate: fromDate, toDate: toDates }
        if (updateRecord) {
            UpdateResignation(newValues);
        }
        else {
            AddEmpResignation(newValues);
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    const UpdateResignation = (values) => {
        request.put(`resignations/edit/${updateRecord?.resignations_id}`, values)
            .then(function (response) {
                dispatch(getResignation());
                FormExternalClose();
                form.resetFields();
                toast.info('Resignation Updated Successfully')
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

    const AddEmpResignation = (values) => {
        request.post('resignations/save', values)
            .then(function (response) {
                toast.success('Resignation Saved Successfully');
                dispatch(getResignation())
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

    const handleOnChange = (e) => {
        setResigDate(e)
    };

    const handleFromdate = (e) => {
        setFromDate(e)
    }

    const handleTodate = (e) => {
        setToDate(e)
    }

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
                    <CustomSelect label={'Employee Name'} options={Resig} name={'employee_name'} onChange={handleOnChangename} rules={[
                        {
                            required: true,
                            message: 'Please enter Employee Name !',
                        }
                    ]}
                    />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>
                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Resignation Date'}
                        name={'resignationsDate'}
                        onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Resignation Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Notice From Date'}
                        name={'noticeDate'}
                        onChange={handleFromdate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter From Date !',
                            }
                        ]}

                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Notice To Date'}
                        name={'toDate'}
                        onChange={handleTodate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter To Date !',
                            }
                        ]}
                    />
                </Col>



                <Col span={24} md={24}>
                    <CustomTextArea label={'Reason For Resignation'} name={'reason'} placeholder={'Reason For Resignation'} rules={[
                        {
                            required: true,
                            message: 'Please enter Reason !',
                        }
                    ]} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateRecord ? (
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
