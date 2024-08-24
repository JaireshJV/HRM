import React from 'react'
import styled from 'styled-components'
import { Form, Input } from 'antd'
import Flex from '../../components/Flex'
import Button from '../../components/Form/CustomButton'
import { THEME } from '../../theme'



const InputWrapper = styled.div`
  padding-bottom: 25px;

`
const Header = styled.div`
  color:${THEME.primary_color};
  margin-bottom:20px;
`

const SignInForm = ({ handleSignIn }) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    handleSignIn(values)
    // form.resetFields();
  }


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
          label={'Email ID'}
          style={{ margin: '0' }}
          name="email"
          rules={[
            { required: true, message: 'Please enter your email address' },
          ]}
        >
          <Input size='large' placeholder="Email" />
        </Form.Item>
      </InputWrapper>
      <br />

      <InputWrapper style={{ padding: '5px 20px' }}>
        <Form.Item
          label={'Password'}
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
        </Flex>
      </Form.Item>

    </Form>
  )
}

export default SignInForm
