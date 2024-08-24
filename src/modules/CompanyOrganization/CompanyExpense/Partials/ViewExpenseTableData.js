import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewExpenseTableData = ({ viewRecord }) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Expense Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.expense_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Expense Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.date}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Amount</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.amount}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Expense Type</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.expense_type}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Description</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{viewRecord.description}</ViewLabelData>
            </Col>

        </CustomRow>
    )
}