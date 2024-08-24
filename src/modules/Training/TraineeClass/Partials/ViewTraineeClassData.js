import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewTraineeClassData = ({viewtraineeClassrecord}) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Trainer Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewtraineeClassrecord.trainer_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewtraineeClassrecord.name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Name of sections</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewtraineeClassrecord.section_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Total Duration</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewtraineeClassrecord.total_duration}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Total Modules</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewtraineeClassrecord.total_modules}</ViewLabelData>
            </Col>

        </CustomRow>
    )
}