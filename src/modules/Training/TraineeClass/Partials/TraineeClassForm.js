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
import { getTraining, getTrainingClass, selectAllTraining } from '../../../../Store/CustomSlice/TrainingSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'

export const TraineeClassForm = ({ FormExternalClose, formReset, formname, updateTraineeClassrecord, updatetrigger }) => {

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [form] = Form.useForm();

    const [traineeId, setTraineeId] = useState()

    const dispatch = useDispatch();

    // ----- Define Form

    useEffect(() => {
        form.resetFields();
    }, [form,formReset])

    useEffect(() => {
        dispatch(getTraining());
    }, [dispatch]);

    useEffect(() => {
        form.setFieldsValue({ traineeDetailsId: traineeId })
    }, [traineeId,form])

    useEffect(() => {
        if (updateTraineeClassrecord) {
            SetTraineeClassDetails()
            form.setFieldsValue({ traineeDetailsId: updateTraineeClassrecord.trainee_details_id })
        }

    }, [form,updateTraineeClassrecord, updatetrigger ])

    const SetTraineeClassDetails = () => {
        const startDate = new Date(updateTraineeClassrecord?.start_date);
        const dateFormat = 'YYYY/MM/DD';
        const starttDate = dayjs(startDate).format(dateFormat);
        form.setFieldsValue({
            trainerName: updateTraineeClassrecord?.trainer_name,
            sectionName: updateTraineeClassrecord?.section_name,
            name: updateTraineeClassrecord?.name,
            totalModules: updateTraineeClassrecord?.total_modules,
            totalDuration: updateTraineeClassrecord?.total_duration,
            startDate: dayjs(starttDate, dateFormat),
        })
    }

    const AllTraining = useSelector(selectAllTraining)

    const traineeList = AllTraining?.map((value) => (
        {
            label: value.name,
            value: value.name
        }
    ))

    const AddTrainingClass = (values) => {
        request.post('traineeClassDetails/save', values)
            .then(function (response) {
                dispatch(getTrainingClass());
                FormExternalClose();
                form.resetFields();
                toast.success('Trainee Class Added Successfully')
            })
            .catch(error => {})
    }

    const UpdateTraineeClass = (values) => {
        request.put(`traineeClassDetails/edittraineeClassDetails/${updateTraineeClassrecord?.trainee_class_id}`, values)
            .then(function (response) {
                dispatch(getTraining());
                dispatch(getTrainingClass());
                FormExternalClose();
                form.resetFields();
                toast.info('Trainee Class updated Successfully')
            })
            .catch(error => {})
    }

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const handleNameChange = (e) => {
        const selectedName = AllTraining.find((value => value.name === e))
        setTraineeId(selectedName.traineeDetailsId)
    }
    // ===== Modal Functions End =====

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        if (updateTraineeClassrecord) {
            UpdateTraineeClass(values);

        }
        else {
            AddTrainingClass(values);
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
                    <CustomInput label={'Trainer Name'} name={'trainerName'} placeholder={'Trainer Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Trainer Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Name of Section'} name={'sectionName'} placeholder={'Name of Section'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter sectionName !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Name'} onChange={handleNameChange} name={'name'} options={traineeList} placeholder={'Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Name !',
                            }
                        ]}
                    />
                    <CustomInput name={'traineeDetailsId'} display={'none'}/>
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Modules'} name={'totalModules'} placeholder={'Total Modules'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter totalModules !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Start Date'}
                        name={'startDate'}
                        value={selectedDate}
                        onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Duration'} name={'totalDuration'} placeholder={'Total Duration'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Total Duration !',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
            {updateTraineeClassrecord ? (
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
