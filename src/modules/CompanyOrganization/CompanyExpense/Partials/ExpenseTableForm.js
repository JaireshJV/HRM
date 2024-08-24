import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { AddExpenseType } from './ExpenseTableModals'
import request from '../../../../utils/request'
import { getExpense,selectAllExpenseType } from '../../../../Store/CustomSlice/CompanySlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'




export const ExpenseTableForm = ({ FormExternalClose, formname, handleUpdate, updateRecord, formReset }) => {


    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [expenseTpe, setExpenseTpe] = useState([]);

    const [trigger,settrigger] = useState(0)


    //=========Modal title and content ============//
    const [modalTitle, setModalTitle] = useState("")

    const [modalContent, setModalContent] = useState(null)

    const [form] = useForm()

    const dispatch = useDispatch();

    useEffect(() => {
        if (updateRecord) {
            setFields()
        }
    }, [updateRecord])
    
    const setFields = () => {
        form.setFieldsValue(updateRecord);

        const personDate = new Date(updateRecord?.date);
        const dateFormat = 'YYYY/MM/DD';
        const personFormattedDate = dayjs(personDate).format(dateFormat);

        form.setFieldsValue({
            date: dayjs(personFormattedDate, dateFormat),
            expenseName: updateRecord?.expense_name,
            expenseTypeId: updateRecord?.expense_type_id

        });
    }

    const FormExternalClosee = () => {
        handleOk();
    }
    const expenseTypeOptions = useSelector(selectAllExpenseType)

    useEffect(() => {
        if(expenseTypeOptions){
            setExpenseTpe(expenseTypeOptions)
        }
    }, [expenseTypeOptions])
    
    const Expenseoption = expenseTpe?.map((com) => ({ label: com.expenseType, value: com.expenseTypeId}))
    // const Expenseoption = [{ label: 'com.expenseType', value:' com.expenseType' }]

    const handleOnChanges = (value) => {
        const SelectedExpense = expenseTpe?.find((mem) => mem.expenseTypeId === value)
        form.setFieldsValue({ expenseType: SelectedExpense?.expenseType })
    }

    const handleOnChange = (e) => {
        setSelectedDate(e);
    };

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onReset = () => {
        form.resetFields()
    }

    const UpdateExpenseType = (values) => {
        request.put(`expense/editdeexpense/${updateRecord?.expense_id}`, values)
            .then(function (response) {
                toast.info('Expense Details Updated Successfully')
                dispatch(getExpense());
                FormExternalClose();

            })
            .catch(error => {
                toast.error('An error occurred while updating the expense .');
            });
    }

    const AddCompanyExpense = (values) => {
        request.post('expense/save', values)
            .then(function (response) {
                toast.success('Expense Details Saved Successfully');
                dispatch(getExpense())
                FormExternalClose();
                form.resetFields();
                if (handleUpdate) {
                    handleUpdate();
                }
            })
            .catch(error => { })
    }

    const handleButtonClick = () => {
        settrigger(trigger+1)
        setModalTitle('Add Expense Type');
        setModalContent(<AddExpenseType formname={'AddExpenseTypeForm'} trigger={trigger}  FormExternalClosee={FormExternalClosee} />);
        showModal()
    }

    const onFinish = (values) => {

        const newValues = { ...values, date: selectedDate }
        if (updateRecord) {
            UpdateExpenseType(newValues)
        }
        else {
            AddCompanyExpense(newValues)
        }

    }

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
                    <CustomInput label={'Expense Name'} name={'expenseName'} placeholder={'Expense Name'} rules={[
                        {
                            required: true,
                            message: 'Please enter Expense Name !',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Expense Date'}
                        name={'date'}
                        onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Amount'} name={'amount'} placeholder={'Amount'} rules={[
                        {
                            required: true,
                            message: 'Please enter Amount !',
                        }
                    ]} />

                </Col>

                <Col span={24} md={12}>
                    <CustomAddSelect  label={'Expense Type'} name={'expenseTypeId'} options={Expenseoption}
                        onButtonClick={handleButtonClick} onChange={handleOnChanges} rules={[
                            {
                                required: true,
                                message: 'Please enter Expense Type !',
                            }
                        ]} />
                    <CustomInput name={'expenseType'} display={'none'} />
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

            <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
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

            <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

        </Form>
    )
}