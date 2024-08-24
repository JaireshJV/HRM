import React, { Fragment, useEffect, useState } from 'react'
import { THEME } from '../../../../theme'
import { AiOutlineEye } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomTable } from '../../../../components/CustomTable'
import { EmployeeQualificationForm } from './EmployeeQualificationForm'
import { ViewEmployeeQualificationData } from './ViewEmployeeQualificationData'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { getQualification, selectAllQualification, getQualificationError, getQualificationStatus } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'

export const EmployeeQualificationTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [dataSource, setDataSource] = useState([])

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getQualification())
  }, [dispatch])

  const AllQualification = useSelector(selectAllQualification)
  const QualificationSts = useSelector(getQualificationStatus)
  const QualificationError = useSelector(getQualificationError)

  useEffect(() => {
    setDataSource(AllQualification)
  }, [AllQualification])

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
    dispatch(getQualification())
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

  const UpdateEmployeeQualificationb = (record) => {
    setFormReset(formReset + 1)
    setModalTitle("Update Employee Qualification");
    setModalContent(<EmployeeQualificationForm record={record} formname={'CustomerAndClientUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const ViewEmployeeQualification = (record) => {
    setModalTitle("View Employee Qualification");
    setModalContent(<ViewEmployeeQualificationData record={record} />);
    showModal();
  };



  // const QualificationStatus = (record) => {

  //   if (record.status === false || record.status === true) {
  //     request
  //       .put(`qualification/or/${record.qualificationId}`)
  //       .then(function (response) {
  //         dispatch(getQualification());
  //         if (response.data === false) {
  //           toast.success('You Click In-Active');
  //         }
  //         else {
  //           toast.success('You Click Active');
  //         }
  //       })
  //       .catch(function (error) {
  //       });
  //   } else {
  //     toast.warn('InActive');
  //   }
  // }

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

           {/* {record?.status === false &&
              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => QualificationStatus(record)}
              >
                <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'}>
                  <HiOutlineBellAlert />
                </TableIconHolder>
              </Popconfirm>
            }
            {record?.status === true &&

              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'IN-ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => QualificationStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>} */}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmployeeQualification(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeeQualificationb(record)}>
              <FiEdit />
            </TableIconHolder>
          </Flex>
        );
      },
    },
    {
      title: 'Status',

      render: (record, i) => {

        return (
          <Fragment>
            {record.status === true ? (
              <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
            ) : (<CustomTag bordered={"true"} color={'error'} title={'In - Active'} />)
            }
          </Fragment>
        );
      },
    },
    {
      title: 'Name',
      render: (record) => {
        const fullName = `${record.firstName} ${record.lastName}`;
        return <span>{fullName}</span>;
      },
    },
    {
      title: 'Highest Qualification',
      dataIndex: 'highestQualification',
    }
  ]

  let TableContent;
  if (QualificationSts === 'loading') {
    TableContent = <CommonLoading />
  } else if (QualificationSts === 'succeeded') {
    const rowKey = (dataSource) => dataSource.qualificationId
    TableContent = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (QualificationSts === 'failed') {
    TableContent = <h2>{QualificationError}</h2>
  }


  return (
    <Fragment>
      {TableContent}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
