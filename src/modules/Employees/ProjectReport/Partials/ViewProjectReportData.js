import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'



export const ViewProjectReportData = ({updateRecord}) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{`${updateRecord.first_name} ${updateRecord.last_name}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Project Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{updateRecord.project_title}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Project Date Given</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{updateRecord.date_give}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Project Date Extended</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{updateRecord.extended_date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Total Project Duration Days</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{updateRecord.duration}</ViewLabelData>
      </Col>


    </CustomRow>
    
  )
}
