import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewEmployeeLeaveData = ({viewRecord}) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Employee Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.first_name} {viewRecord.last_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>From Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.date}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>To Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.to_date}</ViewLabelData>
            </Col>


            <Col span={24} md={10}>
                <ViewLabel>Total Days</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.total_day}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Approved By</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.approved_by}</ViewLabelData>
            </Col>


            <Col span={24} md={10}>
                <ViewLabel>Leave Type</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.leave_type}</ViewLabelData>
            </Col>

            
            <Col span={24} md={10}>
                <ViewLabel>Reason For Leave</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.reason}</ViewLabelData>
            </Col>

        </CustomRow>
    )
}