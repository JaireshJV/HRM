import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'
import Flex from '../../../../components/Flex'
import {base} from '../../../../utils/request'

export const ViewEmployeeAwardsData = ({ record }) => {
  // const base = 'http://192.168.29.66:8080'  
  // const base = 'http://192.168.29.43:8080'
  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
      <ViewLabelData>&nbsp;:&nbsp;{`${record.firstName} ${record.lastName}`}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Award Type</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{record.awardsType}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Cash</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{record.cash}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Date</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{record.date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Gift</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{record.gift}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Description</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{record.description}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Image</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>
          <Flex gap={'10px'}>
            {record.awardsPhotos.map((imageObj) => (
              <img key={imageObj.awardsPhotoId} src={`${base}${imageObj.url}`} alt={'awards'} style={{ height: '100px', }} />
            ))}
          </Flex>
        </ViewLabelData>
      </Col>

    </CustomRow>

  )
}
