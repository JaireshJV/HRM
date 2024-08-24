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
import { getComplaint, getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'


export const EmployeeComplaintsForm = ({ formname, FormExternalClose, formReset, updateRecord, updatetrigger }) => {


    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        if (updateRecord) {
            setComplaintDetails()
        }
    }, [updateRecord, updatetrigger])

    const setComplaintDetails = () => {
        form.setFieldsValue(updateRecord);

        const datecomplain = new Date(updateRecord?.complaints_date);
        const dateFormat = 'YYYY/MM/DD';
        const ComplaintDate = dayjs(datecomplain).format(dateFormat);
        const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;

        form.setFieldsValue({
            first_name: fullName,
            complaintsDate: dayjs(ComplaintDate, dateFormat),
            complaintsAgainst: updateRecord?.complaints_against,
            complaintsTitle: updateRecord?.complaints_title,
            employeeId: updateRecord?.employee_id

        })
    }

    const dispatch = useDispatch();

    const AllComplaints = useSelector(selectAllEmployee)

    useEffect(() => {
        dispatch(getEmployee())
    }, [dispatch])


    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const handleNameChange = (value) => {

        const SelectName = AllComplaints.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectName) {
            form.setFieldsValue({ employeeId: SelectName.employee_id });
        }
    };


    const complain = AllComplaints?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));


    const UpdateComplaints = (values) => {
        request.put(`complaints/edit/${updateRecord?.complaints_id}`, values)
            .then(function (response) {
                toast.info('Complaints Details Updated Successfully')
                dispatch(getComplaint());
                FormExternalClose();
            })
            .catch(error => {
                toast.error('An error occurred while updating the Complaint .');
            });
    }

    const AddComplaint = (values) => {
        request.post('complaints/save', values)
            .then(function (response) {
                toast.success('Complaint Added Successfully')
                dispatch(getComplaint());
                FormExternalClose();
                form.resetFields();
            })

            .catch(error => { })
    }

    const onFinish = (values) => {
        const newValues = { ...values, complaintsDate: selectedDate }
        if (updateRecord) {
            UpdateComplaints(newValues);
        } else {
            AddComplaint(newValues);
        }
        FormExternalClose();
        form.resetFields();
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
                    <CustomInput label={'Complaints Against'} placeholder={'Enter Complaint against'} name={'complaintsAgainst'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Complaint From !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'complaints Title'} placeholder={'Enter Title'} name={'complaintsTitle'}
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
                        name={'complaintsDate'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Employee Name'} options={complain} name={'first_name'} onChange={handleNameChange} rules={[
                        {
                            required: true,
                            message: 'Please enter Employee Name !',
                        }
                    ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Description'} rules={[
                        {
                            required: true,
                            message: 'Please enter Description !',
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
