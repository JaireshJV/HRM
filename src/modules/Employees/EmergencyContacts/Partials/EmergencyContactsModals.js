import { Col, Form } from 'antd'
import React, { useEffect } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { getEmergencyType } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { toast } from 'react-toastify'
import request from '../../../../utils/request'
import { useDispatch } from 'react-redux'

export const AddRelationType = ({ FormExternalClosee, formname  ,updateRecord,updatetrigger,FormExternalClose }) => {

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(updateRecord)
  }, [updateRecord,updatetrigger,form])

  const onReset = () => {
    form.resetFields()
  }

  const UpdateEmergency = (values) => {
    request.put(`relationtype/edit/${updateRecord?.relationTypeId}`, values)
        .then(function (response) {
          toast.info('RelationType  Updated Successfully')
          dispatch(getEmergencyType());
          FormExternalClosee()
        })
        .catch(error => {})
}

const AddEmergency = (values) => {
  request.post('relationtype/save', values)
    .then(function (response) {
      toast.success('Emergency Contacts Saved Successfully');
      dispatch(getEmergencyType())
      FormExternalClosee()
      form.resetFields();
    })
    .catch(error => {})
}


const onFinish = (values) => {
  if(updateRecord){
    UpdateEmergency(values)
  }
  else{
    AddEmergency(values)
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
          <CustomInput label={'Add Relation Type'} name={'relationType'} placeholder={'Add Relation Type'} rules={[
                        {
                            required: true,
                            message: 'Please enter Relation Type !',
                        }
                    ]} />
          <CustomInput name={'relationTypeId'} display={'none'}/>
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
