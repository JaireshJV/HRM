import { Col, Form } from 'antd'
import React, { useEffect } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import request from '../../../../utils/request'
import { useDispatch } from 'react-redux'
import { getExpense, getExpenseType } from '../../../../Store/CustomSlice/CompanySlice'
import { toast } from 'react-toastify'


export const AddExpenseType = ({ trigger, formname, FormExternalClose, FormExternalClosee, handleRecord, updatetrigger }) => {

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields()
  }, [trigger, form])

  useEffect(() => {
    if (handleRecord) {
      form.setFieldsValue(handleRecord)
    }
  }, [handleRecord, trigger, form])

  const AddExpenseType = (values) => {
    request.post('ExpenseType/save', values)
      .then(function (response) {
        dispatch(getExpenseType())
        toast.success('Expense Type Saved Successfully');
        FormExternalClosee()
      })
      .catch(error => { })
  }

  const UpdateExpenseType = (values) => {
    request.put(`ExpenseType/editExpenseType/${handleRecord?.expenseTypeId}`, values)
      .then(function (response) {
        toast.info('Expense Type Updated Successfully')
        dispatch(getExpenseType());
        dispatch(getExpense())
        FormExternalClose()
      })
      .catch(error => { })
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFinish = (values) => {
    if (handleRecord) {
      UpdateExpenseType(values)
    }
    else {
      AddExpenseType(values);
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
      <CustomRow >
        <Col span={24} md={24}>
          <CustomInput name={'expenseTypeId'} display={'none'} />
          <CustomInput label={'Add Expense Type'} name={'expenseType'} placeholder={'Add Expense Type'} rules={[
            {
              required: true,
              message: 'Please enter Add Expense Type !',
            }
          ]} />
        </Col>

      </CustomRow>
      <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
        {handleRecord ? (
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
