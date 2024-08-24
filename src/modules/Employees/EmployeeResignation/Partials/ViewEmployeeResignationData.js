import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'



export const ViewEmployeeResignationData = ({handleRecord}) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{`${handleRecord.first_name} ${handleRecord.last_name}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Resignation Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{handleRecord.resignations_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Notice from Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{handleRecord.notice_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Notice to Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{handleRecord.to_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Notice Period</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{handleRecord.durations}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Reason</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{handleRecord.reason}</ViewLabelData>
      </Col>

    </CustomRow>
    
  )
}
