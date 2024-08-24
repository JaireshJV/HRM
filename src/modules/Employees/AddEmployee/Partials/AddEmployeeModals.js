import React, { useEffect } from 'react'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { Col, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Button from '../../../../components/Form/CustomButton'
import Flex from '../../../../components/Flex'
import { useDispatch } from 'react-redux'
import { getDepartment, getDesignation, getRole } from '../../../../Store/CustomSlice/EmployeeSlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomSelect } from '../../../../components/Form/CustomSelect'

export const AddRoleModal = ({ FormExternalClose, formReset, updatetrigger, FormExternalClosee, rolerecord }) => {

    // ----- Define Form
    const [form] = useForm()

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getRole());
    // }, []);

    useEffect(() => {
        form.setFieldsValue(rolerecord)
    }, [rolerecord, updatetrigger,form])

    const UpdateRoll = (values) => {
        request.put(`role/edit/${rolerecord?.roleId}`, values)
            .then(function (response) {
                toast.info('Roll Details Updated Successfully')
                dispatch(getRole());
                FormExternalClose()
            })
            .catch(error => { })
    }

    const AddRole = (value) => {
        request.post('role/save', value)
            .then(function (response) {
                dispatch(getRole());
                FormExternalClosee();
                form.resetFields();
                toast.success('Role Added Successfully')
            })
            .catch(error => { })
    }

    const onFinish = (values) => {
      
        if (rolerecord) {
            UpdateRoll(values)
        }
        else{
            AddRole(values)
        }
    }

    const onFinishFailed = (value) => {
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{ margin: '30px 0px' }}>
                <CustomInput label={'Role'} placeholder={'Add Role'}
                    name={'roleName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Role ! ! !',
                        },

                    ]} />
                <CustomInput name={'roleId'} display={'none'} />
            </div>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {rolerecord ? (
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


export const AddDesignationModal = ({ FormExternalClose, FormExternalClosee, designationrecord, updatetrigger }) => {


    // ----- Define Form
    const [form] = useForm()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDesignation());
    }, [dispatch]);


    useEffect(() => {
        form.setFieldsValue(designationrecord)
    }, [designationrecord, updatetrigger,form])
    console.log(designationrecord,'iiii');

    const UpdateDesignation = (values) => {
        request.put(`designation/edit/${designationrecord?.designationId}`, values)
            .then(function (response) {
                toast.info('Designation Details Updated Successfully')
                dispatch(getDesignation());
                FormExternalClose()
            })
            .catch(error => { })
    }


    const AddDesignation = (value) => {
        request.post('designation/save', value)
            .then(function (response) {
                dispatch(getDesignation());
                FormExternalClosee();
                form.resetFields();
                toast.success('Designation Added Successfully')
            })
            .catch(error => { })
    }
    const onFinish = (values) => {
        if (designationrecord) {
            UpdateDesignation(values)
        }
        else{
            AddDesignation(values)
        }
    }
    const onFinishFailed = (value) => {
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{ margin: '30px 0px' }}>
                <CustomInput label={'Designation'} placeholder={'Add Designation'}
                    name={'designationName'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter Designation !!!',
                        },

                    ]} />
                <CustomInput name={'designationId'} display={'none'} />
            </div>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {designationrecord ? (
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


export const AddDepartmentModal = ({ FormExternalClose, FormExternalClosee, formReset, departmentrecord, updatetrigger }) => {

    // ----- Define Form
    const [form] = useForm()


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartment());
    }, [dispatch]);


    useEffect(() => {
        form.setFieldsValue(departmentrecord)
    }, [departmentrecord, updatetrigger,form])

    const color = [
        {
            label: "Magenta",
            value: "magenta"
        },
        {
            label: "Red",
            value: "red"
        },
        {
            label: "Volcano",
            value: "volcano"
        },
        {
            label: "Orange",
            value: "orange"
        },
        {
            label: "Gold",
            value: "gold"
        },
        {
            label: "Lime",
            value: "lime"
        },
        {
            label: "Green",
            value: "green"
        },
        {
            label: "Cyan",
            value: "cyan"
        },
        {
            label: "Blue",
            value: "blue"
        },
        {
            label: "Geekblue",
            value: "geekblue"
        },
        {
            label: "Purple",
            value: "purple"
        },
    ]



    const UpdateDepartment = (values) => {
        console.log(values, 'ssssssssssssssss');
        request.put(`department/edit/${departmentrecord?.departmentId}`, values)
            .then(function (response) {
                toast.info('Department Details Updated Successfully')
                dispatch(getDepartment());
                FormExternalClose()
                console.log('cccc');
            })
            .catch(error => console.log(error, 'error'))
    }


    const AddDepartment = (value) => {
        request.post('department/save', value)
            .then(function (response) {
                dispatch(getDepartment());
                FormExternalClosee();
                form.resetFields();
                toast.success('Department Added Successfully')
            })
            .catch(error => { })
    }
    const onFinish = (values) => {
        console.log(values, 'ONFINISH');
        if (departmentrecord) {
            UpdateDepartment(values)
        } else {
            AddDepartment(values)
        }
    }

    const onFinishFailed = (value) => {
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow>
                <Col span={24}>
                    <CustomInput label={'Department'} placeholder={'Add Department'}
                        name={'departmentName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Department !!!',
                            },

                        ]} />
                    <CustomInput name={'departmentId'} display={'none'} />
                </Col>
                <Col span={24}>
                    <CustomSelect options={color} label={'Color'} placeholder={'Select Color'} name={'colour'} rules={[
                        {
                            required: true,
                            message: 'Please select color !!!',
                        },

                    ]} />
                </Col>
            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                {departmentrecord ? (
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
