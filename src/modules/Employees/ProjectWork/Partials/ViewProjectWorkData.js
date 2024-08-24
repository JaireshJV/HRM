import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'

const renderNames = (record) => {
  const renderedNames = record.firstName.map((firstName, index) => {
    const fullName = `${firstName} ${record.lastName[index]}`;
    return index !== record.firstName.length - 1 ? `${fullName}, ` : fullName;
  });
  return renderedNames.join('');
};


export const ViewProjectWorkData = ({ viewprojectworkrecord }) => {

  return (

    <CustomRow space={[12, 12]}>

      <Col span={24} md={10}>
        <ViewLabel>Employee Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>
          &nbsp;:&nbsp;{renderNames(viewprojectworkrecord)}
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Project Name</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewprojectworkrecord.projectTitle}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Total Duration</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewprojectworkrecord.duration} Days</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Date Of Assigning</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewprojectworkrecord.date}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Description</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;:&nbsp;{viewprojectworkrecord.description}</ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Employee Designation</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>
          <span className="colon">&nbsp;:&nbsp;</span>
          {viewprojectworkrecord.designationName.map((value, index) => (
            <span key={index}>
              {value}
              {index !== viewprojectworkrecord.designationName.length - 1 && ','}&nbsp;
            </span>
          ))}
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Employee Department</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>
          <span className="colon">&nbsp;:&nbsp;</span>
          {viewprojectworkrecord.departmentName.map((value, index) => (
            <span key={index}>
              {value}
              {index !== viewprojectworkrecord.departmentName.length - 1 && ','}&nbsp;
            </span>
          ))}
        </ViewLabelData>
      </Col>
      {viewprojectworkrecord.dateCompleted &&
        <>
          <Col span={24} md={10}>
            <ViewLabel>Completed Date</ViewLabel>
          </Col>
          <Col span={24} md={10}>
            <ViewLabelData>&nbsp;:&nbsp;{viewprojectworkrecord.dateCompleted}</ViewLabelData>
          </Col>
        </>
      }


    </CustomRow>

  )
}
