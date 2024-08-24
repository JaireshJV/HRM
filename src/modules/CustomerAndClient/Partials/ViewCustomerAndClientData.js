import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../components/CommonStyle/CommonStyled'

export const ViewCustomerAndClient = ({ viewrecord }) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Gender</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.gender}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number 1</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.phone_no1}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number 2</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.phone_no2}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Email ID</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.email}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>City</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.city}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>State</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.state}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Country</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.country}</ViewLabelData>
      </Col>


      <Col span={24} md={10}>
        <ViewLabel>Address</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.address}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Form Type</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewrecord.form_type_name}</ViewLabelData>
      </Col>
    </CustomRow>

  )
}
