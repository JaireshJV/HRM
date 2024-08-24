import { Col } from 'antd'
import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'


export const ViewAssestsTable = ({updateRecord}) => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Employee Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{`${updateRecord.first_name} ${updateRecord.last_name}`}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Product Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.product_name}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Serial Number</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.serial_number}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Purchase Date</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.purchase_date}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Model Number</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.model_number}</ViewLabelData>
            </Col>

            <Col span={24} md={10}>
                <ViewLabel>Brand Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.brand_name}</ViewLabelData>
            </Col>

            
            <Col span={24} md={10}>
                <ViewLabel>KeyBoard Brand Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.keyboard_brand_name}</ViewLabelData>
            </Col>

            
            <Col span={24} md={10}>
                <ViewLabel>Mouse Brand Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.mouse_brand_name}</ViewLabelData>
            </Col>

            
            <Col span={24} md={10}>
                <ViewLabel>Count Of Products</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;{updateRecord.count_of_products}</ViewLabelData>
            </Col>

        </CustomRow>
    )
}