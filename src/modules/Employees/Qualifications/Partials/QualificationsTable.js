import React, { Fragment, useState } from 'react'
import { THEME } from '../../../../theme'
import { AiOutlineEye } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomTable } from '../../../../components/CustomTable'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { CustomTag } from '../../../../components/CustomTag'
import { QualificationForm } from './QualificationsForm'
import { ViewQualificationData } from './ViewQualificationsData'


export const QualificationTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
  }

  const FormCancelRest = () => {
    setFormReset(formReset + 1)
  }

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  // ===== Modal Functions End =====

  const UpdateEmployeeQualificationb = () => {
    setModalTitle("Update Employee Qualification");
    setModalContent(<QualificationForm formname={'CustomerAndClientUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const ViewEmployeeQualification = () => {
    setModalTitle("View Employee Qualification");
    setModalContent(<ViewQualificationData />);
    showModal();
  };

 

  const TableColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.green} size={'22px'} onClick={ViewEmployeeQualification}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={UpdateEmployeeQualificationb}>
              <FiEdit />
            </TableIconHolder>
            {/* <Popconfirm
                  title="Delete the Product"
                  description="Are you sure to delete this Product?"
                  onConfirm={() => confirm(record)}
                  onCancel={cancel}
                  icon={
                    <QuestionCircleOutlined size={'30'}
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                  placement="topLeft"
                  okText="Yes"
                  cancelText="No"
                >
                  <Button.Danger text={<DeleteOutlined />} />
                </Popconfirm> */}
          </Flex>
        );
      },
    },
    {
      title: 'Status',
      render: (record, i) => {
        return (
          <Fragment>
            <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
            <CustomTag bordered={"true"} color={'error'} title={'In - Active'} />
          </Fragment>
        );
      },
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
    },
    {
      title: 'Highest Qualification',
      dataIndex: 'highest_qualification',
    }
  ]

  const data = [{
    key: '1',
    employee_name: "Emp",
    highest_qualification: 'B-Tech'
  }]

  return (
    <Fragment>
      <CustomTable columns={TableColumn} data={data} />
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
