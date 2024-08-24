import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'

export const HolidaysForm = ({ FormExternalClose, formReset, formname }) => {
    
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [form] = useForm()

    useEffect(() => {
        form.resetFields();
    }, [formReset])

    const company = [
        {
           label:'Employee 1',
           value:'employee1'
        },
        {
            label:'Employee 2',
            value:'employee2'
        },
        {
            label:'Employee 3',
            value:'employee3'
        },
    ]

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    
        const onReset = () => {
            form.resetFields()
        }
    
        const onFinish = (values) => {
            FormExternalClose()
            form.resetFields()
      
        }
    
        const onFinishFailed = (errorInfo) => {
        
        }

  return (
   <Form
   form={form}
   labelCol={{span:24}}
   wrapperCol={{span:24}}
   formname={formname}
   onFinish={onFinish}
   onFinishFailed={onFinishFailed}
   >
        <CustomRow space={[12,12]}>
            <Col span={24} md={12}>
                <CustomSelect label={'Company Name'} name={'company_name'} options={company}/>
            </Col>


            <Col span={24} md={12}>
                <CustomInput label={'Event Name'} name={'event_name'}/>
            </Col>

            <Col span={24} md={12}>
                <CustomDatePicker 
                label={'Start Date'}
                 name={'start_date'}
                 onChange={handleOnChange}
                 value={selectedDate}/>
            </Col>

            <Col span={24} md={12}>
                <CustomDatePicker 
                label={'End Date'}
                 name={'end_date'}
                 onChange={handleOnChange}
                 value={selectedDate}/>
            </Col>

            <Col span={24} md={12}>
                <CustomTextArea label={'Description'} name={'reason_for_leave'}/>
            </Col>
        </CustomRow>

        <Flex center={'true'} gap={'20px'} margin={'20px 0'}>
            <Button.Success text={'Save'} htmlType={'submit'} />
            <Button.Danger text={'Cancel'} onClick={()=>{onReset()}} />
        </Flex>

   </Form>
  )
}
