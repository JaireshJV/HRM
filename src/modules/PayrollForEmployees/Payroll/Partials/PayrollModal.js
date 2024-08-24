import React,{useEffect} from 'react'
import { Col, Form } from 'antd'
import Button from '../../../../components/Form/CustomButton';
import { CustomInput } from '../../../../components/Form/CustomInput';
import Flex from '../../../../components/Flex';
import { CustomRow } from '../../../../components/CustomRow';
import { getPayrollType } from '../../../../Store/CustomSlice/PayrollSlice';
import { toast } from 'react-toastify';
import request from '../../../../utils/request';
import { useDispatch } from 'react-redux';

export const  PayrollModal = ({formname,updateRecord,FormExternalClosee,FormExternalClose,trigger}) => {
 

const [form] = Form.useForm();

const dispatch = useDispatch()


useEffect(() => {
  form.setFieldsValue(updateRecord)
}, [updateRecord,trigger,form])


const onReset = () => {
  form.resetFields()
}

const Updatepayment = (values) => {
  request.put(`/PaymentType/editPaymentType/${updateRecord?.paymentTypeId}`, values)
      .then(function (response) {
        toast.info('PaymentType Updated Successfully')
        dispatch(getPayrollType());
        FormExternalClosee()
         
      })
      .catch(error => {})
}

const AddPayroll = (values) => {
  request.post('PaymentType/save', values)
      .then(function (response) {
          toast.success("Employee Transfer Saved Successfully !");
          dispatch(getPayrollType());
          FormExternalClosee();
          form.resetFields();
      })
      .catch(error => {})
}
  
const onFinish = (values) => {
  if (updateRecord) {
    Updatepayment(values)
  }
  else {
    AddPayroll(values);
  }
  FormExternalClose()
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
          <CustomInput label={'Add Payment Type'} name={'paymentType'} placeholder={'Add Payment Type'} rules={[
                        {
                            required: true,
                            message: 'Please enter Payment Type !',
                        }
                    ]}  />
          <CustomInput name={'paymentTypeId'} display={'none'}/>
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

    </Form>
  )
}

