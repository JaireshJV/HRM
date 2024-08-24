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
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomUpload } from '../../../../components/Form/CustomUpload'
import { useDispatch, useSelector } from 'react-redux'
import { getAwards, getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { base } from '../../../../utils/request'

export const EmployeeAwardsForm = ({ formname, FormExternalClose, formReset, record, }) => {
    // ----- Define Form
    const [form] = Form.useForm();


    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [updateFormData, setUpdateFormData] = useState({})

    const dispatch = useDispatch();

    useEffect(() => {

        const awardsPhotoUrls = record?.awardsPhotos.map((photo, index) => (
            {
                uid: `${index + 1}`,
                name: `example${index}.jpg`,
                status: 'done',
                url: `${base}${photo.url}`,
            }
        ));

        if (record) {
            setImageInitialValue(awardsPhotoUrls)
        }
        setUpdateFormData(record)

    }, [record])


    useEffect(() => {
        if (record) {
            const formattedDate = dayjs(record.date)
            const fullName = `${record?.firstName} ${record?.lastName}`;
            form.setFieldsValue(updateFormData)
            form.setFieldsValue({ awardsPhotos: null });
            form.setFieldsValue({ 'date': formattedDate })
            form.setFieldsValue({
                'firstName': fullName
            })
        }
    }, [record,updateFormData, formReset, ImageInitialValue, form])

    useEffect(() => {
        dispatch(getEmployee());
    }, [dispatch]);

    const EmployeeDetails = useSelector(selectAllEmployee)

    const EmployeeeName = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));


    const onReset = () => {
        form.resetFields();
    };
    const handleOnChanges = (value) => {

        const SelectName = EmployeeDetails.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectName) {
            form.setFieldsValue({ employeeId: SelectName.employee_id });
        }
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const AddEmployeeAwards = (values) => {
        request.post('awards/save', values, config)
            .then(function (response) {
                dispatch(getAwards())
                FormExternalClose();
                form.resetFields();
                toast.success('Employee Award Saved Successfully!')
            })
            .catch(error => { })
    }

    const UpdateEmployeeAwards = (value) => {
        request.put(`edit/${record.awardsId}`, value, config)
            .then(function (response) {
                dispatch(getAwards())
                form.resetFields();
                FormExternalClose();
                toast.info('Employee Award Updated Successfully!')
            })
            .catch(error => { })
    }

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('gift', values?.gift);
        formData.append('cash', values?.cash);
        formData.append('description', values?.description ? values?.description : '');
        formData.append('date', selectedDate);
        formData.append('employeeId', values?.employeeId);
        formData.append('awardsType', values?.awardsType);

        if (values?.awardsPhotos && values.awardsPhotos.length > 0) {
            values.awardsPhotos.forEach((file) => {
                formData.append(`awardsPhoto`, file.originFileObj);
            });
        } else {
        }


        if (record) {
            UpdateEmployeeAwards(formData)
        } else {
            AddEmployeeAwards(formData)
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
                    <CustomSelect label={'Employee Name'} options={EmployeeeName} onChange={handleOnChanges} name={'firstName'} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Gift'} placeholder={'Enter Gift'} name={'gift'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Gift !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Cash'} name={'cash'} placeholder={'cash'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'date'}
                        onChange={handleOnChange}
                        value={selectedDate} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Award Type'} name={'awardsType'} placeholder={'Award type'} />
                </Col>

                {record &&
                    <Col>
                        <h3>Selected Image</h3>
                        <div style={{ gap: '10px', display: 'flex', flexDirection: 'row' }}>
                            {ImageInitialValue?.map(img => (
                                <div>
                                    <img src={img.url} style={{ height: '100px', width: '100px' }} alt='AwardsImgs' />
                                </div>

                            ))}
                        </div>
                    </Col>
                }

                <Col span={24} md={12}>
                    <CustomUpload form={form} label={'Upload Award Photo'} name={'awardsPhotos'} listType='picture-card' maxCount={3} accept='.png,.jpeg,.jpg' rules={[
                        {
                            required: true,
                            message: 'Please Upload Image'
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Description'} />
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
    )
}
