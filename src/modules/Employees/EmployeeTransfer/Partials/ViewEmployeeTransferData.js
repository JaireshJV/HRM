import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'

export const ViewEmployeeTransferData = ({viewrecord}) => {
  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.first_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Designation</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.designation_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Role</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.role_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Transfer to</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.location}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Description</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.description}</ViewLabelData>
      </Col>

    </CustomRow>
    
  )
}
