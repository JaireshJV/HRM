import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'
import { CustomPageFormSubTitle } from '../../../../components/CustomPageTitle'


export const ViewAddedEmployeeData = ({ viewEmployeerecord }) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{`${viewEmployeerecord.first_name} ${viewEmployeerecord.last_name}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Email ID</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.email}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Gender</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.gender}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Phone Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.phone_number}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Date Of Birth</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.dob}</ViewLabelData>
      </Col>

      
      <Col span={24} md={10}>
        <ViewLabel>Date Of Joining</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.date_of_joining}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>City</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.city}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>State</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.state}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>marital Status</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.marital}</ViewLabelData>
      </Col>

      
      <Col span={24} md={10}>
        <ViewLabel>Country</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.country}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Work Experience</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.experience}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Role</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.role_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Description</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.description}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Address</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.address}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Designation</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.designation_name}</ViewLabelData>
      </Col>

      <Col span={24} md={24}>
        <CustomPageFormSubTitle Heading={'BANK DETAILS :'} />
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Bank Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.bank_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Branch Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.branch_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Account Number</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.account_number}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Account Holder Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.holder_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>IFSC Code</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewEmployeerecord.ifse_code}</ViewLabelData>
      </Col>





    </CustomRow>

  )
}
