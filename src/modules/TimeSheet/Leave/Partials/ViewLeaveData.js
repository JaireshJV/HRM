import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewLeaveData = () => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Employee Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;Expensive Guy</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Leave From</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;07/07/2023</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Leave Type</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;Good</ViewLabelData>
            </Col>
        </CustomRow>
    )
}