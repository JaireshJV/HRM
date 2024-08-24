import React, { useEffect, useState } from 'react'
import { Col, Form } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomInput } from '../../../../components/Form/CustomInput'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber'
import dayjs from 'dayjs'
import Label from '../../../../components/Form/Label'
import { CustomCheckBox } from '../../../../components/Form/CustomCheckBox'
import { CustomRadioButton } from '../../../../components/Form/CustomRadioButton'
import request from '../../../../utils/request'
import { CustomTimePicker } from '../../../../components/Form/CustomTimePicker'
import { getAttendance } from '../../../../Store/CustomSlice/TimeSheetSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


export const UpdateAttendanceForm = ({ FormExternalClose, formReset, formname, updateRecord, getEmployeeList }) => {

    const [form] = Form.useForm();      // ----- Define Form


    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (updateRecord) => {
    setIsChecked(!isChecked);

    if( isChecked === true ){
      form.setFieldsValue({ status: true})

    }
    else{
        form.setFieldsValue({ status: false})  
    
    }
  };

    useEffect(() => {
        form.setFieldsValue({
            attendanceDate: dayjs(updateRecord?.attendance_date).format('YYYY-MM-DD'),
            employeeId: updateRecord?.employee_id,
            designation_name: updateRecord?.designation_name,
            status: updateRecord?.attstatus,
            present: updateRecord?.attstatus,
            section: updateRecord?.section,
            intime: dayjs(updateRecord?.intime, 'HH:mm:ss A'),
            outtime: dayjs(updateRecord?.outtime, 'HH:mm:ss A'),
            attendanceListId: updateRecord?.attendance_list_id

        },)
    }, [form,updateRecord,formReset])


    const options = [
        {
            label: 'Half',
            value: 'Half',
        },
        {
            label: 'Full',
            value: 'Full',
        },
    ];

    // ===== Modal Functions End =====

    const onReset = () => {
        form.resetFields();
    };


    const UpdateAttendance = (values) => {
        
        request.put(`attendance/edit/${updateRecord.attendance_list_id}`, values)
            .then(function (response) {          
                toast.success('Updated successfully')
                FormExternalClose();
                dispatch(getAttendance())
                form.resetFields();
            })
            .catch(function (error) {
        
            });
    }

    const inTimeChange = (e) => {

    }

    const outTimeChange = (e) => {
   
    }


    const onFinish = (values) => {
        const result = {
            intime: dayjs(values.intime).format("hh:mm:ss A"),
            outtime: dayjs(values.outtime).format("hh:mm:ss A"),
            attstatus: values.present,
            section: values.section,
            employeeId: values.employeeId
        }
       
        UpdateAttendance(result)

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
                    <CustomInput label={'Date'} name={'attendanceDate'} disabled={'true'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Employee ID'} name={'employeeId'} disabled={'true'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Designation'} name={'designation_name'} disabled={'true'} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Status'} name={'status'} disabled={'true'}  />
                    <CustomInput name={'attendanceListId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                    <Label>Present</Label> <br /><br />
                    <CustomCheckBox label={'Present'} name={'present'}  onChange={handleCheckboxChange}     />
                </Col>
                <Col span={24} md={12}>
                    <Label>Section</Label> <br /><br />
                    <CustomRadioButton name={'section'} options={options} />
                </Col>

                <Col span={24} md={12}>
                    <Label>In Time</Label> <br /><br />
                    <CustomTimePicker use12Hours  name='intime' onChange={inTimeChange} />
                </Col>

                <Col span={24} md={12}>
                    <Label>Out Time</Label> <br /><br />
                    <CustomTimePicker use12Hours name='outtime' onChange={outTimeChange} />
                </Col>

            </CustomRow>

            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                <Button.Primary text={'Update'} htmlType={'submit'} />
                <Button.Danger text={'cancel'} onClick={() => onReset()} />
            </Flex>

        </Form>
    )
}
