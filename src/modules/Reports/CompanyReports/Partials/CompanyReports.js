import React, { Fragment, useState, useEffect } from 'react'
import { CustomDateRangePicker } from '../../../../components/Form/CustomDateRangePicker'
import Button from '../../../../components/Form/CustomButton'
import Flex from '../../../../components/Flex'
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { useDispatch, useSelector, } from 'react-redux'
import { getAnnouncement, selectAllAnnouncement } from '../../../../Store/CustomSlice/CompanySlice'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CompanyReportsTable } from './CompanyReportsTable'


export const CompanyReports = () => {

  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const announcement = useSelector(selectAllAnnouncement)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnnouncement())
  }, [dispatch])

 useEffect(() => {
  setDataSource(announcement)
 }, [announcement])
 
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
      startdate: startDate,
      enddate: endDate,
    }
    CmpReport(ConvertedValue)

  };

  const CmpReport = (values) => {
    request.post('announcements/correctdate', values)
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
    dispatch(getAnnouncement())
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
      <CompanyReportsTable dataSource={dataSource}/>
    </Fragment>
  )
}

