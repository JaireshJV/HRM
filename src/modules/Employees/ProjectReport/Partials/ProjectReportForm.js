import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import { getProject, selectAllProjects } from '../../../../Store/CustomSlice/ProjectSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { getProjectReport } from '../../../../Store/CustomSlice/SecondemployeeSlice'

export const ProjectReportForm = ({ formname, FormExternalClose, formReset, updateRecord }) => {

    // ----- Define Form
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(dayjs().format('YYYY-MM-DD'));

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])

    useEffect(() => {
        if (updateRecord) {
            SetProjectWorkDetails()
        }
    }, [updateRecord])
     
    const SetProjectWorkDetails = () => {
        const fromdatee = new Date(updateRecord?.date_give)
        const Todatee = new Date(updateRecord?.extended_date)
        const dateFormat = 'YYYY-MM-DD';
        const FrmDateee = dayjs(fromdatee).format(dateFormat);
        const ToDateee = dayjs(Todatee).format(dateFormat);
        const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;
        form.setFieldsValue(updateRecord)

        form.setFieldsValue({
            employee_name: fullName,
            employeeId: updateRecord?.employee_id,
            projectTitle: updateRecord?.project_title,
            projectId: updateRecord?.project_id,
            dateGive: dayjs(FrmDateee, dateFormat),
            extendedDate: dayjs(ToDateee, dateFormat),
        })
    }

    useEffect(() => {
        dispatch(getEmployee());
        dispatch(getProject());
        dispatch(getProjectReport());

    }, [dispatch]);

    const handleNameChange = (value) => {

        const SelectedEmptDetails = EmployeeName.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectedEmptDetails) {
            form.setFieldsValue({ employeeId: SelectedEmptDetails.employee_id });
        }
    };


    const EmployeeName = useSelector(selectAllEmployee);

    const EmployeNameList = EmployeeName?.map((value) => (
        {
            label: `${value.first_name} ${value.last_name}`,
            value: `${value.first_name} ${value.last_name}`,
        }
    ))

    const projectDetails = useSelector(selectAllProjects)

    const projectOptions = projectDetails?.map((details) => ({

        label: details.projectTitle,
        value: details.projectTitle
    }))

    const handleOnChanges = (value) => {
        const SelectedProject = projectDetails?.find((mem) => mem.projectTitle === value)
        form.setFieldsValue({ projectId: SelectedProject?.projectId })
    }


    const onReset = () => {
        form.resetFields();
    };

    const handleFromDate = (e) => {
        setFromDate(e);
    };

    const handleToDate = (e) => {
        setToDate(e);
    }

    const UpdateProjectReport = (values) => {
        request.put(`projectreport/edit/${updateRecord?.project_report_id}`, values)
            .then(function (response) {
                dispatch(getProjectReport());
                FormExternalClose();
                form.resetFields();
                toast.info('Project Report  Updated Successfully')
            })
            .catch(error => {})
    }


    const AddProjectReport = (values) => {
        request.post('projectreport/save', values)
            .then(function (response) {
                toast.success(response.data);
                dispatch(getProjectReport())
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => {})
    }

    const onFinish = (values) => {
        const newValues = { ...values, fromDate: fromDate, toDate: toDate }
        if (updateRecord) {
            UpdateProjectReport(newValues);
        }
        else {
            AddProjectReport(newValues);
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
                    <CustomSelect label={'Employee Name'} options={EmployeNameList} name={'employee_name'} onChange={handleNameChange} rules={[
                        {
                            required: true,
                            message: 'Please enter Employee Name !',
                        }
                    ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Project Name'} options={projectOptions} name={'projectTitle'} onChange={handleOnChanges} rules={[
                        {
                            required: true,
                            message: 'Please enter Project Name !',
                        }
                    ]} />
                    <CustomInput name={'projectId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Project Date Given'}
                        name={'dateGive'}
                        onChange={handleFromDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Given Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Project Date Extended'}
                        name={'extendedDate'}
                        onChange={handleToDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Extended Date !',
                            }
                        ]}
                    />
                </Col>

                {/* <Col span={24} md={12}>
                    <CustomInputNumber label={'Total Project Duration Days'} name={'duration'} placeholder={'Total Project Duration Days'} />
                </Col> */}

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
                        <Button.Primary text={'Reset'} onClick={() => onReset()} />
                    </>
                )}
            </Flex>

        </Form>
    )
}
