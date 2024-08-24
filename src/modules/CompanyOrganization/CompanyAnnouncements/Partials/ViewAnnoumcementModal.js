import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'
import { Col } from 'antd'

export const ViewAnnoumcementModal = ({viewannouncementrecord}) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Title for Announcement</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewannouncementrecord.title}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Company Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewannouncementrecord.company_name}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>From Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewannouncementrecord.from_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>To Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewannouncementrecord.to_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Informed By</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewannouncementrecord.informed_by}</ViewLabelData>
      </Col>

    </CustomRow>
    
  )
}
