import React from 'react'
import Button from '../../../components/Form/CustomButton'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import Flex from '../../../components/Flex'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../authSlice'
import { useSelector } from 'react-redux'

const InputWrapper = styled.div`
  padding-bottom: 25px;

`
const Header = styled.div`
  color:#fff;
  margin-bottom:20px;
`


const SignInForm = ({ handleSignIn }) => {

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const token = useSelector(selectCurrentUser);

  const onFinish = values => {
    handleSignIn(values)
    // form.resetFields();
  }

  console.log('SInginForm')

  return (
    <Form onFinish={onFinish}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      form={form}>

      <Flex center={'true'}>
        <Header>
          <h1 style={{ fontSize: '30px', }}>Login</h1>
        </Header>
      </Flex>

      <InputWrapper style={{ padding: '5px 20px' }}>
        <Form.Item
          style={{ margin: '0' }}
          name="username"
          rules={[
            { required: true, message: 'Please enter your email address' },
          ]}
        >
          <Input size='large' placeholder="username" />
        </Form.Item>
      </InputWrapper>
      <br />

      <InputWrapper style={{ padding: '5px 20px' }}>
        <Form.Item
          style={{ margin: '0' }}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a password',
            },
          ]}
        >
          <Input.Password size='large' placeholder="Password" style={{ borderRadius: '8px' }} />
        </Form.Item>
      </InputWrapper>

      <Form.Item style={{ padding: '5px 20px' }}>
        <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
          <Button.Primary text={'Login'} htmlType="submit" />
          <Button.Danger text={'Cancel'} htmlType="reset" />
        </Flex>
      </Form.Item>

    </Form>
  )
}

export default SignInForm
