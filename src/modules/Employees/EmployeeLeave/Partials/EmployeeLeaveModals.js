import { Col, Form } from 'antd'
import React, { useEffect } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { useDispatch } from 'react-redux'
import { getLeaveType } from '../../../../Store/CustomSlice/SecondemployeeSlice'

export const LeaveTypeModal = ({ formReset, formname, FormExternalClosee,updateRecord,trigger }) => {

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  useEffect(() => {
  form.setFieldsValue(updateRecord)
  }, [updateRecord,trigger,form])
  

  // useEffect(() => {
  //   form.resetFields();
  // }, [formReset])

  const onReset = () => {
    form.resetFields()
  }

  const Updatepayment = (values) => {
    request.put(`LeaveType/edit/${updateRecord?.leaveTypeId}`, values)
        .then(function (response) {
          toast.info('LeaveType Updated Successfully')
          dispatch(getLeaveType());
          FormExternalClosee()
        })
        .catch(error => {})
  }

  const AddEmployeeLeave = (values) => {
    request.post('LeaveType/save', values)
      .then(function (response) {
        toast.success('LeaveType Saved Successfully');
        dispatch(getLeaveType());
        FormExternalClosee();
        form.resetFields();
      })
      .catch(error => {})
  }

  const onFinish = (values) => {
    if(updateRecord){
      Updatepayment(values)
    }
    else{
      AddEmployeeLeave(values)
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
          <CustomInput label={'Add Leave Type'} name={'leaveType'} placeholder={'Add Leave Type'}
            rules={[
              {
                required: true,
                message: 'Please enter Leave Type !',
              }
            ]} />
                     <CustomInput name={'leaveTypeId'} display={'none'} />
        </Col>

      </CustomRow>

      <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
                {updateRecord ? (
                    <>
                        <Button.Primary text={'Update'} htmlType={'submit'} />
                        <Button.Danger text={'Cancel'} onClick={() => FormExternalClosee()} />
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
