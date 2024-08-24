import React, { useState } from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../../../components/CustomRow'
import { ViewLabel, ViewLabelData } from '../../../../components/CommonStyle/CommonStyled'
import {base} from '../../../../utils/request'
import Button from '../../../../components/Form/CustomButton'
import { CustomModal } from '../../../../components/CustomModal'
import ViewPdf from './ViewPdf'


export const ViewEmployeeQualificationData = ({ record, status }) => {
console.log(record,"recordrecordrecord");

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

    // ===== Modal Functions Start =====

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    // ===== Modal Functions End =====
  
    const ViewPDF = (record) => {
      setModalTitle("VIEW PDF");
      setModalContent(<ViewPdf record={record}/>);
      showModal();
    };

  return (

    <CustomRow space={[12, 12]}>

      {!status &&
        <>
          <Col span={24} md={10}>
            <ViewLabel>Employee Name</ViewLabel>
          </Col>

          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{record.firstName} {record.lastName}</ViewLabelData>
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Highest Qualification</ViewLabel>
          </Col>

          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{record.highestQualification}</ViewLabelData>
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Aadhar Number</ViewLabel>
          </Col>

          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{record.aadharno}</ViewLabelData>
          </Col>

          <Col span={24} md={10}>
            <ViewLabel>Pan Number</ViewLabel>
          </Col>

          <Col span={24} md={14}>
            <ViewLabelData>&nbsp;:&nbsp;{record.pancard}</ViewLabelData>
          </Col>
        </>
      }

      <Col span={24} md={10}>
        <ViewLabel>Aadhar</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData> &nbsp;&nbsp;
          <img src={`${base}${record.aadharUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Pan</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.pannoUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Bank Book</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.bankBookUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Degree</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.degreeUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Photo</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.photourl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>10th Certificate</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.tenUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>


      <Col span={24} md={10}>
        <ViewLabel>12th Certificate</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
          <img src={`${base}${record.twelveUrl}`} alt={'aadhhar'} style={{ height: '100px', }} />
        </ViewLabelData>
      </Col>

      <Col span={24} md={10}>
        <ViewLabel>Resume</ViewLabel>
      </Col>

      <Col span={24} md={14}>
        <ViewLabelData>&nbsp;&nbsp;
        <Button.Primary text={'View PDF'} onClick={() => ViewPDF(record)}/>
        </ViewLabelData>
      </Col>

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </CustomRow>

  )
}
