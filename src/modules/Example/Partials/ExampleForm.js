import React, { useEffect, useState } from 'react'
import { Col, Form } from 'antd'
import { CustomInput } from '../../../components/Form/CustomInput'
import { CustomRow } from '../../../components/CustomRow'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { CustomPageFormSubTitle } from '../../../components/CustomPageTitle'
import { CustomInputNumber } from '../../../components/Form/CustomInputNumber'
import { CustomTextArea } from '../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../components/Form/CustomSelect'
import { SampleSmallForm } from './SampleSmallForm'
import { CustomAddSelect } from '../../../components/Form/CustomAddSelect'
import { CustomModal } from '../../../components/CustomModal'
import { CustomUpload } from '../../../components/Form/CustomUpload'
import { CustomTimePicker } from '../../../components/Form/CustomTimePicker'
import { CustomMultiSelect } from '../../../components/Form/CustomMultiSelect'

export const ExampleForm = ({ FormExternalClose, formReset, formname }) => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null)

  const [form] = Form.useForm();      // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset])

  const categoryOption = [
    {
      label: '1st Item',
      value: '1st item'
    },
    {
      label: '2nd Item',
      value: '2nd item'
    }
  ]

  const categoryOption1 = [
    {
      label: '1st Item',
      value: '1st item',
      key: '1',
    },
    {
      label: '2nd Item',
      key: '1',
      value: '2nd item',
    },
    {
      label: '3rd Item',
      value: '3rd item',
      key: '2',
    },
    {
      label: '4th Item',
      key: '4',
      value: '4th item'
    },
    {
      label: '5th Item',
      value: '5th item',
      key: '2',
    },
    {
      label: '6th Item',
      key: '3',
      value: '6th item'
    }
  ]

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ===== Modal Functions End =====

  const handleButtonClick = () => {
    setModalTitle("Add Category");
    setModalContent(<SampleSmallForm />);
    showModal();
  };

  const onReset = () => {
    form.resetFields();
  };

  const inTimeChange = (time) => {
    setInTime(time);
  }

  const ChangeProductId = (e) => {
  }

  const onFinish = (values) => {

    // const NewValue = { ...values, Time: inTime }

    FormExternalClose();
    form.resetFields();
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
          <CustomInput label={'User Name'} name={'name'} />
        </Col>

        <Col span={24} md={12}>
          <CustomInput label={'User Name'} name={'email'} type={'email'} />
        </Col>

        <Col span={24}>
          <CustomPageFormSubTitle Heading={'Customer Details'} />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber label={'Phone Number'} name={'phonenumber'} precision={2} />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea label={'Address'} name={'address'} />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload label={'Upload'} name={'upload'} listType='picture-card' maxCount={3} accept='.png,.jpeg,.jpg' rules={[
            {
              required: true,
              message: 'Please Select Image'
            }
          ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker label={'Upload'} name={'Time'} onChange={inTimeChange} rules={[
            {
              required: true,
              message: 'Please Select Time'
            }
          ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomAddSelect label={'Product Category'} name={'categoryid'}
            onButtonClick={handleButtonClick}
            onChange={ChangeProductId}
            options={categoryOption}
            rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} />
        </Col>

        <Col span={24} md={12}>
          <CustomMultiSelect
            mode={'multiple'}
            options={categoryOption1}
            label={'Product Category'}
            name={'category'}
            maxTagCount={2}
            rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} onChange={ChangeProductId} />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            mode={'multiple'}
            options={categoryOption}
            label={'Product Category'}
            name={'category'}
            rules={[
              {
                required: true,
                message: 'Please enter details!',
              },
            ]} onChange={ChangeProductId} />
        </Col>

      </CustomRow>

      <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
        <Button.Success text={'Submit'} htmlType={'submit'} />
        <Button.Danger text={'cancel'} onClick={() => onReset()} />
      </Flex>

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Form>
  )
}
