import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import request from '../../../../utils/request'
import { getAnnouncement, getCompany, selectAllCompany } from '../../../../Store/CustomSlice/CompanySlice'
import { useDispatch, useSelector } from 'react-redux'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { toast } from 'react-toastify'

export const AnnouncementForm = ({ formname, FormExternalClose, formReset, updateAnnounceRecord, updatetrigger }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'))

    useEffect(() => {
        form.resetFields();
    }, [form, formReset])

    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    const onReset = () => {
        form.resetFields();
    };

    const AllAnnouncement = useSelector(selectAllCompany);

    const announcementList = AllAnnouncement?.map((value) => (
        {
            label: value.companyName,
            value: value.companyId
        }
    ))

    useEffect(() => {
        if (updateAnnounceRecord) {
            SetAnnouncementDetails()
            form.setFieldsValue({ company_id: updateAnnounceRecord.company_id })
        }

    }, [updateAnnounceRecord, updatetrigger, form])

    const SetAnnouncementDetails = () => {
        const frommDate = new Date(updateAnnounceRecord?.from_date);
        const tooDate = new Date(updateAnnounceRecord?.to_date);
        const dateFormat = 'YYYY/MM/DD';
        const fromDate = dayjs(frommDate).format(dateFormat);
        const toDate = dayjs(tooDate).format(dateFormat);

        form.setFieldsValue({
            announcementId: updateAnnounceRecord?.announcement_id,
            companyId: updateAnnounceRecord?.company_id,
            fromDate: dayjs(fromDate, dateFormat),
            informedBy: updateAnnounceRecord?.informed_by,
            title: updateAnnounceRecord?.title,
            toDate: dayjs(toDate, dateFormat),
        })
    }

    const handleFromdate = (e) => {
        setFromDate(e)
    }

    const handleTodate = (e) => {
        setToDate(e)
    }

    const handleNameChange = (e) => {

    }

    const AddAnnouncement = (values) => {
        request.post('announcement/save', values)
            .then(function (response) {
                dispatch(getAnnouncement());
                FormExternalClose();
                form.resetFields();
                toast.success('Announcement Added Successfully')
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
                else{
                   toast.error('Failed') 
                }
            })
           
    }

    const UpdateAnnouncement = (values) => {
        request.put(`announcement/editAnnouncement/${updateAnnounceRecord?.announcement_id}`, values)
            .then(function (response) {
                dispatch(getAnnouncement());
                FormExternalClose();
                form.resetFields();
                toast.info('Announcement Updated Successfully')
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
                else{
                   toast.error('Failed') 
                }
            })
    }

    const onFinish = (values) => {
        const newValues = { ...values, fromDate: fromDate, toDate: toDate, }
        if (updateAnnounceRecord) {
            UpdateAnnouncement(newValues);
        }
        else {
            AddAnnouncement(newValues);
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    useEffect(() => {

        if (updateAnnounceRecord) {
            SetAnnouncementDetails()
        }
    }, [updateAnnounceRecord, updatetrigger])

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
                    <CustomInput label={'Title for Announcement'} placeholder={'Enter title'} name={'title'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter title !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Company Name'} onChange={handleNameChange} name={'companyId'} options={announcementList} placeholder={'Company Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please select companyName !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Start Date'}
                        name={'fromDate'}
                        onChange={handleFromdate}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'End Date'}
                        name={'toDate'}
                        onChange={handleTodate}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Informed By'} name={'informedBy'} placeholder={'Informed By'} />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateAnnounceRecord ? (
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
