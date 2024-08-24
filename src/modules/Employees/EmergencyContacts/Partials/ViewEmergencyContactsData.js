import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewEmergencyContactsData = ({viewRecord}) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Employee Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.first_name} {viewRecord.last_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Employee Relation Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.relatino_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Phone Number</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.phone_number}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Relation Type</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.relation_type}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>City</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.city}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>State</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.state}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Country</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.country}</ViewLabelData>
            </Col>
             
            <Col span={24} md={10}>
                <ViewLabel>Address</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.address}</ViewLabelData>
            </Col>
        </CustomRow>
    )
}