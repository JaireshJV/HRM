import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { useForm } from 'antd/es/form/Form'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { AddRelationType } from './EmergencyContactsModals'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { getEmergencyContact, getEmergencyType, selectAllEmergencyType } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'



export const EmergencyContactsForm = ({ FormExternalClose, trigger, formname, Record, formReset }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataSource, setDataSource] = useState([]);

    const dispatch = useDispatch()

    //=========Modal title and content ============//
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [form] = useForm()

    useEffect(() => {
        form.resetFields();
    }, [formReset,form])


    useEffect(() => {
        dispatch(getEmergencyContact())
        dispatch(getEmergencyType())
        dispatch(getEmployee())
    }, [dispatch])
    useEffect(() => {
        if (Record) {
            form.setFieldsValue(Record)
            const fullName = `${Record?.first_name} ${Record?.last_name}`;
            form.setFieldsValue({
                employee_name: fullName,
                relatinoName: Record?.relatino_name,
                phoneNumber: Record?.phone_number,
                relationType: Record?.relation_type,
                employeeId: Record?.employee_id,
                relationTypeId: Record?.relation_type_id
            })
        }
    }, [Record, trigger,form])

    const AllEmergencyContact = useSelector(selectAllEmergencyType)
    const EmployeeDetails = useSelector(selectAllEmployee)


    const EmergencyContactoption = dataSource?.map((com) => ({ label: com.relationType, value: com.relationType }))

    const handleOnChanges = (value) => {
        const SelectedEmergencycontact = dataSource?.find((mem) => mem.relationType === value)
        form.setFieldsValue({ relationTypeId: SelectedEmergencycontact?.relationTypeId })
    }

    useEffect(() => {
        setDataSource(AllEmergencyContact)
    }, [AllEmergencyContact])

    const handleNameChange = (value) => {

        const SelectedEmergencycontacts = EmployeeDetails.find(
            (item) => `${item.first_name} ${item.last_name}` === value
        );

        if (SelectedEmergencycontacts) {
            form.setFieldsValue({ employeeId: SelectedEmergencycontacts.employee_id });
        }
    };


    const EmployeeeName = EmployeeDetails?.map((empdetails) => ({
        label: `${empdetails.first_name} ${empdetails.last_name}`,
        value: `${empdetails.first_name} ${empdetails.last_name}`
    }));

    const UpdateEmergencyContact = (values) => {
        request.put(`emergencycontacts/edit/${Record?.emergency_contacts_id}`, values)
            .then(function (response) {
                toast.info('Emergency Contacts Updated Successfully')
                dispatch(getEmergencyContact());
                FormExternalClose();
            })
            .catch(error => {
                toast.error('An error occurred while updating the Emergency Contact .');
            });
    }

    const AddComplaint = (values) => {
        request.post('emergencycontacts/save', values)
            .then(function (response) {
                toast.success('Emergency Contacts Added Successfully');
                dispatch(getEmergencyContact())
                FormExternalClose();
                form.resetFields();
            })
            .catch(error => { })
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

    const onReset = () => {
        form.resetFields()
    }

    const handleButtonClick = () => {
        setModalTitle('Add Relation Type');
        setModalContent(<AddRelationType FormExternalClosee={FormExternalClosee} formname={'AddRelationTypeForm'}  />);
        showModal()
    }
    const onFinish = (values) => {
        if (Record) {
            UpdateEmergencyContact(values);
        }
        else {
            AddComplaint(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            formname={formname}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <CustomRow space={[12, 12]}>
                <Col span={24} md={12}>
                    <CustomSelect label={'Employee Name'} options={EmployeeeName} name={'employee_name'} onChange={handleNameChange} rules={[
                        {
                            required: true,
                            message: 'Please enter Employee Name !',
                        }
                    ]} />
                    <CustomInput name={'employeeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Employee Relation Name'} name={'relatinoName'} placeholder={'Relation Name'} rules={[
                        {
                            required: true,
                            message: 'Please enter Relation Name !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone Number'} name={'phoneNumber'} placeholder={'Phone Number'} maxLength={10}
                        minLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number !',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect label={'Relation Type'} name={'relationType'} options={EmergencyContactoption} onButtonClick={handleButtonClick} onChange={handleOnChanges} rules={[
                        {
                            required: true,
                            message: 'Please enter Relation Type !',
                        }
                    ]} />
                    <CustomInput name={'relationTypeId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'City'} name={'city'} placeholder={'City'} rules={[
                        {
                            required: true,
                            message: 'Please enter City !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'State'} name={'state'} placeholder={'State'} rules={[
                        {
                            required: true,
                            message: 'Please enter State !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Country'} rules={[
                        {
                            required: true,
                            message: 'Please enter Country !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Address'} rules={[
                        {
                            required: true,
                            message: 'Please enter Address !',
                        }
                    ]} />
                </Col>

            </CustomRow>

            <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
                {Record ? (
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

            <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

        </Form>
    )
}
