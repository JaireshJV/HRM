import { Col, Form } from 'antd'
import React, { useEffect } from 'react'
import { CustomRow } from '../../../../components/CustomRow';
import { CustomInput } from '../../../../components/Form/CustomInput';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { useDispatch } from 'react-redux';
import { getBrandType, getKeyboardType, getMouseType } from '../../../../Store/CustomSlice/AssestSlice';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

export const AddBrandModal = ({ FormExternalClosee, UpdateRecord, updatetrigger, FormExternalClose }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(UpdateRecord)
  }, [form,UpdateRecord, updatetrigger])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBrandType())
  }, [dispatch])


  const onReset = () => {
    form.resetFields()
  }


  const UpdateBrand = (values) => {
    request.put(`/Brand/editBrand/${UpdateRecord?.brandId}`, values)
      .then(function (response) {
        toast.info('Brand Details Updated Successfully')
        dispatch(getBrandType());
        FormExternalClosee()
      })
      .catch(error => {})
  }


  const AddBrand = (values) => {
    request.post('Brand/save', values)
      .then(function (response) {
        toast.success("Brand Saved Successfully !");
        dispatch(getBrandType());
        FormExternalClosee()
        form.resetFields();
      })
      .catch(error => {})
  }

  const onFinish = (values) => {
    if (UpdateRecord) {
      UpdateBrand(values)
    }
    else {
      AddBrand(values);
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >

      <CustomRow >
        <Col span={24} md={24}>
          <CustomInput label={'Add Brand Type'} name={'brandName'} placeholder={'Add Brand Type'}
            rules={[
              {
                required: true,
                message: 'Please enter Brand Name !',
              }
            ]} />
        </Col>


      </CustomRow>

      <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
        {UpdateRecord ? (
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


export const AddKeyboardModal = ({ FormExternalClosee, updateRecord, updatetrigger, FormExternalClose }) => {

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(updateRecord)
  }, [form,updateRecord, updatetrigger])

  const dispatch = useDispatch()

  const onReset = () => {
    form.resetFields()
  }

  const UpdateKeyBoardBrand = (values) => {
    request.put(`/KeyboardBrand/editKeyboardBrand/${updateRecord?.keyboardBrandId}`, values)
      .then(function (response) {
        toast.info('KeyboardBrand Details Updated Successfully')
        dispatch(getKeyboardType());
        FormExternalClosee()
      })
      .catch(error => {})
  }


  const AddKeyBoardBrand = (values) => {
    request.post('KeyboardBrand/save', values)
      .then(function (response) {
        toast.success("KeyboardBrand Saved Successfully !");
        FormExternalClosee()
        dispatch(getKeyboardType());
        form.resetFields();
        
      })
      .catch(error => {})
  }
  const onFinish = (values) => {
    if (updateRecord) {
      UpdateKeyBoardBrand(values)
    }
    else {
      AddKeyBoardBrand(values);
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >

      <CustomRow >
        <Col span={24} md={24}>
          <CustomInput label={'Add KeyBoard Type'} name={'keyboardBrandName'} placeholder={'Add KeyBoard Type'}
            rules={[
              {
                required: true,
                message: 'Please enter Keyboard Name !',
              }
            ]} />
        </Col>

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
            <Button.Danger text={'Reset'} onClick={() => onReset()} />
          </>
        )}
      </Flex>

    </Form>
  )
}

export const AddMouseModal = ({ FormExternalClosee, updateRecord, FormExternalClose,updatetrigger }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(updateRecord)
  }, [updateRecord,updatetrigger,form])
  
  const dispatch = useDispatch()

  const onReset = () => {
    form.resetFields()
  }

  const UpdateMouseBrand = (values) => {
    request.put(`/mouseBrand/editMouseBrand/${updateRecord?.mouseBrandId}`, values)
      .then(function (response) {
        toast.info('mouseBrand Details Updated Successfully')
        dispatch(getMouseType());
        FormExternalClosee()
      })
      .catch(error => {})
  }

  const AddMouseBrand = (values) => {
    request.post('MouseBrand/save', values)
      .then(function (response) {
        toast.success("MouseBrand Saved Successfully !");
        FormExternalClosee()
        dispatch(getMouseType());
        form.resetFields();
      })
      .catch(error => {})
  }

  const onFinish = (values) => {
    if (updateRecord) {
      UpdateMouseBrand(values)
    }
    else {
      AddMouseBrand(values);
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >

      <CustomRow >
        <Col span={24} md={24}>
          <CustomInput label={'Add Mouse Type'} name={'mouseBrandName'} placeholder={'Add Mouse Type'}
            rules={[
              {
                required: true,
                message: 'Please enter Mouse Name !',
              }
            ]} />
        </Col>

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
            <Button.Danger text={'Reset'} onClick={() => onReset()} />
          </>
        )}
      </Flex>
      
    </Form>
  )
}


