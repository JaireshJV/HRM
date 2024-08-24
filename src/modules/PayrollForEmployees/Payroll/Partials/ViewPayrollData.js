import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'

export const ViewPayrollData = ({viewRecord}) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{`${viewRecord.first_name} ${viewRecord.last_name}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Account Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.account_number}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.phone_number}</ViewLabelData>
      </Col>



      <Col span={24} md={10}>
        <ViewLabel>Total Deductions</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.total_deductions}</ViewLabelData>
      </Col>

      
      <Col span={24} md={10}>
        <ViewLabel>Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Current Salary</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.current_salary}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Total Salary</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.total_salary}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Allowance</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.allowance}</ViewLabelData>
      </Col>

      
      <Col span={24} md={10}>
        <ViewLabel>payment Type</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.payment_type}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>No of Working Days In a Month</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewRecord.no_of_days_working_ina_month}</ViewLabelData>
      </Col>

    </CustomRow>
    
  )
}
