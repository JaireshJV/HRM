import React, { useEffect } from 'react';
import { Col, Form } from 'antd';
import Flex from '../../../components/Flex';
import Button from '../../../components/Form/CustomButton'
import { toast } from 'react-toastify';
import request from '../../../utils/request';
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import { getCustomer, getFormtype } from '../../../Store/CustomSlice/CustomerSlice';
import { useDispatch } from 'react-redux';

const CustomerAndClientModal = ({ formname, updaterecord, FormExternalClosee, formtypetrigger, FormExternalClose ,trigger }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    SetFormType()
  }, [updaterecord, formtypetrigger,trigger])

  const SetFormType = () => { form.setFieldsValue({ formTypeName: updaterecord?.formTypeName }) }

  const onReset = () => {
    form.resetFields()
  }

  const AddFormType = (values) => {
    request.post('formrypes/save', values)
      .then(function (response) {
        toast.success(response.data);
        dispatch(getFormtype());
        FormExternalClosee();
        form.resetFields();
      })
      .catch(error => { })
  }

  const UpdateFormType = (values) => {
    request.put(`formrypes/edit/${updaterecord?.formTypeId}`, values)
      .then(function (response) {
        toast.info("Form Type Updated Succesfully");
        dispatch(getFormtype());
        dispatch(getCustomer());
        FormExternalClose();
        form.resetFields();
      })
      .catch(error => { })
  }

  const onFinish = (values) => {
    if (updaterecord) {
      UpdateFormType(values)
    }
    else {
      AddFormType(values);
    }
  }

  const onFinishFailed = (errorInfo) => {

  }

  return (
    <Form
      form={form}
      name={formname}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <CustomRow >
        <Col span={24} md={24}>
          <CustomInput label={'Add Referal'} name={'formTypeName'} placeholder={'Add Referal'}
            rules={[
              {
                required: true,
                message: 'Please enter Form Type !',
              }
            ]} />
        </Col>

      </CustomRow>

      <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
        {updaterecord ? (
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

export default CustomerAndClientModal