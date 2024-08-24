import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'
import { Col } from 'antd'

export const ViewCompanyProfile = ({ viewcompanyrecord }) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Company Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.companyName}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.phoneNumber1}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Alternative Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.phoneNumber2}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Email ID</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.email}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Location</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.location}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>State</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.state}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Country</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.country}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Address</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.address}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Pincode</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.pincode}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>GST No</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.gstNo}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Tax No</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.faxNo}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Bank Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.bankName}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Branch Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.branchName}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Account Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.accountNo}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Account Holder Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.accountHolderName}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>IFSC Code</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewcompanyrecord.ifscCode}</ViewLabelData>
      </Col>

    </CustomRow>
  )
}
