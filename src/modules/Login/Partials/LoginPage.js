import { Form } from 'antd'
import React from 'react'
import Flex from '../../../components/Flex'

const LoginPage = () => {

    
const InputWrapper = styled.div`
padding-bottom: 25px;

`
const Header = styled.div`
color:#fff;
margin-bottom:20px;
`


    return (
        <div>
            <Form onFinish={onFinish}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}>

                <Flex center>
                    <Header>
                        <h1 style={{ fontSize: '30px', }}>Login</h1>
                    </Header>
                </Flex>

                <InputWrapper style={{ padding: '5px 20px' }}>
                    <Form.Item
                        style={{ marginBottom: '0' }}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email address' },
                        ]}
                    >
                        <Input type={'email'} size='large' placeholder="Email" />
                    </Form.Item>
                </InputWrapper>
                <br />

                <InputWrapper style={{ padding: '5px 20px' }}>
                    <Form.Item
                        style={{ marginBottom: '0' }}
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
                    <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                        <Button.Primary text={'Login'} htmlType="submit" />
                    </Flex>
                </Form.Item>

            </Form>
        </div>
    )
}

export default LoginPage