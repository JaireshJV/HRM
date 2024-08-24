import React, { Fragment, useState, useEffect } from 'react'
import { Col, Form } from 'antd'
import { useDispatch, useSelector, } from 'react-redux'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../../components/CustomRow'
import { CustomDateRangePicker } from '../../../../../components/Form/CustomDateRangePicker'
import Flex from '../../../../../components/Flex'
import Button from '../../../../../components/Form/CustomButton'
import { ResignationReportTable } from './ResignationReportTable'
import { getResignation, selectAllResignation } from '../../../../../Store/CustomSlice/EmployeeSlice'


export const ResignationReportForm = () => {


  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const AllResignation = useSelector(selectAllResignation)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getResignation())
  }, [dispatch])

 useEffect(() => {
  setDataSource(AllResignation)
 }, [AllResignation])
 
  const [form] = Form.useForm();

  const selectDateChange = (dates) => {
    setDateRange(dates);
  };

  const onFinish = (values) => {
    const newValue = { ...values, range: dateRange }
    const value = newValue;
    const range = value.range.split(' - ');
    const startDate = range[0];
    const endDate = range[1];
    const ConvertedValue = {
      startDate: startDate,
      endDate: endDate,
    }
    ReportResignation(ConvertedValue)

  };

  const ReportResignation = (values) => {
    request.post('resignations/date', values)
      .then(function (response) {
        toast.success(response.data);
        setDataSource(response.data)
        form.resetFields();
      })
      .catch(error => {})
  }

  const onFinishFailed = (errorInfo) => {
  };

  const onReset = () => {
    dispatch(getResignation())
    form.resetFields()
  }


  return (
    <Fragment>
      <CustomCardView width={'800px'}   >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete='off'

        >
          <CustomRow gutter={[24, 24]} >
            <Col md={6}></Col>
            <Col span={24} md={12}>
              <CustomPageFormTitle Heading={'Search Date'} />
              <CustomDateRangePicker
                onChange={selectDateChange}
                value={dateRange}
                name={'range'}
                rules={[{ required: true, message: 'Please select date' }]} />
            </Col>

          </CustomRow>
          <Flex center gap={'20px'} W_100 style={{ marginTop: '30px' }}>
            <Button.Primary text={'Search'} htmlType={'submit'} />
            <Button.Danger text={'Reset'} onClick={() => onReset()}  />
          </Flex>
        </Form>
      </CustomCardView>
      <ResignationReportTable dataSource={dataSource}/>

    </Fragment>
  )
}

