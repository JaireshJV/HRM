import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'

export const ViewTraineeDetailsData = ({ viewtraineerecord }) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewtraineerecord.name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewtraineerecord.phoneNumber}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>State</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewtraineerecord.state}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Country</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewtraineerecord.country}</ViewLabelData>
      </Col>

    </CustomRow>

  )
}
