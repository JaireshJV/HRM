import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { Col } from 'antd'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'

export const ViewUpdatedAttendance = ({viewRecord}) => {
    return (

        <CustomRow space={[12, 12]}>
    
          <Col span={24} md={10}>
            <ViewLabel>Name</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{`${viewRecord.first_name} ${viewRecord.last_name}`}</ViewLabelData>
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Designation</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{viewRecord.designation_name}</ViewLabelData>      
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Status</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
          <ViewLabelData>&nbsp;:&nbsp;{viewRecord.present ? 'true' : 'false'}</ViewLabelData>  
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Section</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{viewRecord.section}</ViewLabelData>   
          </Col>

          
          <Col span={24} md={10}>
            <ViewLabel>In-Time</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{viewRecord.intime}</ViewLabelData>   
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Out-Time</ViewLabel>
          </Col>
    
          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{viewRecord.outtime}</ViewLabelData>   
          </Col>
    
    
    
        </CustomRow>
    
      )
}
