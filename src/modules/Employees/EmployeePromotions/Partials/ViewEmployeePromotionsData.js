import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewEmployeePromotionsData = ({ viewrecord }) => {
  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{`${viewrecord.first_name} ${viewrecord.last_name}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Role To Be Promoted</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.role_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Promoted By</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.promotions_by}</ViewLabelData>
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
