import React, { Fragment, useState, useEffect } from 'react'
import { Col, Form } from 'antd'
import { useDispatch, useSelector, } from 'react-redux'
import { toast } from 'react-toastify'
import { CustomDateRangePicker } from '../../../../../components/Form/CustomDateRangePicker'
import Button from '../../../../../components/Form/CustomButton'
import Flex from '../../../../../components/Flex'
import { CustomRow } from '../../../../../components/CustomRow'
import request from '../../../../../utils/request'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle'
import {  getTrainingClass, selectAllTrainingClass } from '../../../../../Store/CustomSlice/TrainingSlice'
import { TraineeReportsTable } from './TraineeReportsTable'


export const TraineeReportsForm = () => {

  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const trainee = useSelector(selectAllTrainingClass)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTrainingClass())
  }, [dispatch])

 useEffect(() => {
  setDataSource(trainee)
 }, [trainee])

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
      fromdate: startDate,
      todate: endDate,
    }
    ReportTrainee(ConvertedValue)
  };

  const ReportTrainee = (values) => {
    request.post('findtrainingbydate', values)
      .then(function (response) {
        setDataSource(response.data);
        form.resetFields();
      })
      .catch(error => {
        toast.error('Error fetching report. Please check the date range and try again.');
      });
  }

  const onFinishFailed = (errorInfo) => {
  };

  const onReset = () => {
    dispatch(getTrainingClass())
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
      <TraineeReportsTable dataSource={dataSource} />
    </Fragment>
  )
}

