import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewAddProjecttData = ({ viewrecord }) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Project Title</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.projectTitle}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Client Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.customerName}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Contact</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.contact}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Location</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.city}</ViewLabelData>
            </Col>
            <Col span={24} md={10}>
                <ViewLabel>Start Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.fromDate}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>End Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.toDate}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Assigned To</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>
                    <span className="colon">:&nbsp;</span>
                    {viewrecord.designationName.map((value, index) => (
                        <span key={index}>
                            {value}
                            {index !== viewrecord.designationName.length - 1 && ','}&nbsp;
                        </span>
                    ))}
                </ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Project Total Amount</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewrecord.totalProjectAmount}</ViewLabelData>
            </Col>

        </CustomRow>
    )
}