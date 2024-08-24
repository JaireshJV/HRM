import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInput } from '../../../../components/Form/CustomInput'
import request from '../../../../utils/request'
import { getProjectWork } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getDesignation, getEmployee, selectAllEmployee, getDepartment, selectAllDepartment } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CustomMultiSelect } from '../../../../components/Form/CustomMultiSelect'
import { getNonAssginedProject, selectNonAssignedProjects } from '../../../../Store/CustomSlice/ProjectSlice'
import { getNotification } from '../../../../Store/CustomSlice/NotificationSlice'

export const ProjectWorkForm = ({ formname, FormExternalClose, formReset, updateprojectwork, updatetrigger }) => {

    console.log(updateprojectwork, 'updateprojectwork');
    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [completedDate, setCompletedDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [selectedEmp, setSelectedEmp] = useState([])
    const [projectProcess, setProjectProcess] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateprojectwork) {
            const values = {
                projectWorkId: updateprojectwork.projectWorkId
            }
            request.post(`update/status`, values)
                .then((resp) => {
                })
                .catch(error => { })
        }
    }, [updateprojectwork, updatetrigger])

    useEffect(() => {
        form.resetFields();
    }, [formReset, form])

    useEffect(() => {
        if (updateprojectwork) {
            SetProjectWorkDetails();
        }
    }, [updateprojectwork, updatetrigger])

    const SetProjectWorkDetails = () => {
        const frommDate = new Date(updateprojectwork?.date);
        const dateFormat = 'YYYY/MM/DD';
        const fromDatee = dayjs(frommDate).format(dateFormat);
        const firstNames = updateprojectwork.firstName
        const lastNames = updateprojectwork.lastName
        const FullName = [];
        for (let i = 0; i < Math.min(firstNames.length, lastNames.length); i++) {
            FullName.push(firstNames[i] + lastNames[i]);
        }

        setSelectedEmp(FullName)
        setSelectedDate(dayjs(fromDatee, dateFormat))
        form.setFieldsValue({
            emp_name: updateprojectwork?.employeeId,
            projectId: updateprojectwork?.projectId,
            projectName: updateprojectwork.projectTitle,
            designation_name: updateprojectwork.designationName,
            employeeId: updateprojectwork?.employeeId,
            duration: updateprojectwork?.duration,
            date: updateprojectwork.date,
            description: updateprojectwork?.description,
            designationId: updateprojectwork?.designationId,
            departmentId: updateprojectwork.departmentId,
            department_name: updateprojectwork.departmentId,
            work: updateprojectwork.work === 'Started' ? null : updateprojectwork.work,
            holdReson: updateprojectwork.work === 'Hold' ? updateprojectwork.holdReson : null,
        })
        if (updateprojectwork.work !== 'Started') {
            setProjectProcess(updateprojectwork.work)
        }
    }

    const projectDetails = useSelector(selectNonAssignedProjects);

    useEffect(() => {
        dispatch(getNonAssginedProject());
        dispatch(getProjectWork());
        dispatch(getEmployee());
        dispatch(getDesignation());
        dispatch(getDepartment());
    }, [dispatch]);

    const EmployeeName = useSelector(selectAllEmployee);

    const EmployeNameList = EmployeeName?.map((value) => (
        {
            label: `${value.first_name} ${value.last_name}`,
            value: value.employee_id
        }
    ))

    const EmployeeDepartment = useSelector(selectAllDepartment)

    const EmployeeDepartmentList = EmployeeDepartment.map(value => ({
        label: value.departmentName,
        value: value.departmentId
    }))

    const projectOptions = projectDetails?.map((details) => ({

        label: details.projectTitle,
        value: details.projectId
    }))

    //   ======== handle Change Functions ===========

    const handleNameChange = (e) => {
        form.setFieldsValue({ employeeId: e })
    }

    const handleProjectWork = (value) => {
        setProjectProcess(value)
    }

    const ChangeDeptId = (value) => {
        form.setFieldsValue({ departmentId: value })
    }

    const handleproject = (val) => {
        const selectedProject = projectDetails.find(boii => boii.projectId === val)
        form.setFieldsValue({ designation_name: selectedProject.designationName });
        form.setFieldsValue({ designationId: selectedProject.designationId });
    }


    const AddProjectWork = (values) => {
        request.post('projectwork/save', values)
            .then(function (response) {
                dispatch(getProjectWork());
                dispatch(getNonAssginedProject());
                dispatch(getNotification())
                FormExternalClose();
                form.resetFields();
                toast.success('projectwork Added Successfully')
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

    const UpdateProjectWorkDetails = (values) => {
        request.put(`projectwork/edit/${updateprojectwork?.projectWorkId}`, values)
            .then(function (response) {
                dispatch(getProjectWork());
                dispatch(getNonAssginedProject());
                FormExternalClose();
                toast.info('ProjectWork Updated Successfully')
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

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const handleOnChangeCompeted = (date) => {
        setCompletedDate(date);
    };


    const onFinish = (values) => {

        if (updateprojectwork) {
            const newValues = {
                date: selectedDate,
                description: values.description,
                designationId: values.designationId,
                duration: values.duration,
                employeeId: values.employeeId,
                projectId: values.projectId,
                departmentId: values.departmentId,
                work: values.work,
                dateCompleted: values.work === 'Completed' ? completedDate : null,
                holdReson: values.work === 'Hold' ? values.holdReson : null,
            }
            UpdateProjectWorkDetails(newValues);
        }
        else {
            const newValues = {
                date: selectedDate,
                description: values.description,
                designationId: values.designationId,
                duration: values.duration,
                employeeId: values.employeeId,
                projectId: values.projectId,
                departmentId: values.departmentId,
            }
            AddProjectWork(newValues);
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    const projectLevel = [
        {
            label: "Hold",
            value: "Hold"
        },
        {
            label: "Pending",
            value: "Pending"
        },
        {
            label: "onProcess",
            value: "OnProcess"
        },
        {
            label: "Completed",
            value: "Completed"
        },

    ]



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
                    <CustomMultiSelect
                        mode={'multiple'}
                        label={'Employee Name'}
                        placeholder={"Select Employee"}
                        onChange={handleNameChange}
                        value={selectedEmp}
                        options={EmployeNameList}
                        name={'emp_name'}
                        maxTagCount={2}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Employee Name !',
                            }
                        ]}
                    />

                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    {
                        updateprojectwork ?
                            <CustomInput disabled label={'Project Name'} name={'projectName'} /> :
                            <CustomSelect placeholder={"Select Project"} onChange={handleproject} label={'Project Name'} options={projectOptions} name={'projectId'} rules={[
                                {
                                    required: true,
                                    message: 'Please enter Project Name !',
                                }
                            ]} />
                    }
                    <CustomInput name={'projectId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput disabled={updateprojectwork ? true : false} label={'Total Duration'} name={'duration'} placeholder={'Total Duration'} rules={[
                        {
                            required: true,
                            message: 'Please enter Total Duration !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    {updateprojectwork ?
                        <CustomInput label={'Starting Date'} name={'date'} disabled /> :
                        <CustomDatePicker
                            label={'Starting Date'}
                            name={'date'}
                            onChange={handleOnChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Assigning Date !',
                                }
                            ]}
                        />
                    }

                </Col>

                {updateprojectwork &&
                    <Col span={24} md={12}>
                        <CustomSelect placeholder={'Select level'} onChange={handleProjectWork} label={'Project Level'} options={projectLevel} name={'work'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select project level !',
                                }
                            ]} />
                    </Col>
                }
                {
                    projectProcess === 'Hold' &&
                    <Col span={24} md={12}>
                        <CustomInput label={'Reason for Hold'} name={'holdReson'} rules={[
                            {
                                required: true,
                                message: 'Please enter reason !',
                            }
                        ]} />
                    </Col>
                }
                {
                    projectProcess === 'Completed' &&
                    <Col span={24} md={12}>
                        <CustomDatePicker
                            label={'Completed Date'}
                            name={'dateCompleted'}
                            onChange={handleOnChangeCompeted}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Completed Date !',
                                }
                            ]}
                        />
                    </Col>
                }
                <Col span={24} md={12}>
                    <CustomTextArea rows={2} disabled label={'Employee Designation'} name={'designation_name'} />
                    <CustomInput name={'designationId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomMultiSelect
                        mode={'multiple'}
                        label={'Select Department'}
                        name={'department_name'}
                        options={EmployeeDepartmentList}
                        onChange={ChangeDeptId}
                        placeholder={'Employee Department'}
                        maxTagCount={2}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Department !',
                            }
                        ]}
                    />
                    <CustomInput name={'departmentId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Description'} name={'description'} placeholder={'Enter Description'} rules={[
                        {
                            required: true,
                            message: 'Please enter Description !',
                        }
                    ]} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {updateprojectwork ? (
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
