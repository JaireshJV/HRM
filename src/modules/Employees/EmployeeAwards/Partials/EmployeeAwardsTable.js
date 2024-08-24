import React, { Fragment, useEffect, useState } from 'react'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import { EmployeeAwardsForm } from './EmployeeAwardsForm'
import { ViewEmployeeAwardsData } from './ViewEmployeeAwardsData'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { CustomTable } from '../../../../components/CustomTable'
import { CustomTag } from '../../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllAwards, getAwards, getAwardsError, getAwardsStatus } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import request from '../../../../utils/request'
import { Popconfirm } from 'antd'

export const EmployeeAwardsTable = () => {

  const dispatch = useDispatch()
  // const base = 'http://192.168.29.66:8080'
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [dataSource, setDataSource] = useState([])

  const AllRewards = useSelector(selectAllAwards)
  const AwardError = useSelector(getAwardsError)
  const AwardSts = useSelector(getAwardsStatus)

  useEffect(() => {
    dispatch(getAwards())
  }, [dispatch])

  useEffect(() => {
    setDataSource(AllRewards)
  }, [AllRewards])

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
    dispatch(getAwards())
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

  const UpdateEmployeeAwards = (record) => {
    setModalTitle("Update Employee Awards");
    setModalContent(<EmployeeAwardsForm formname={'EmployeeAwardsUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} record={record} />);
    showModal();
  };

  const ViewEmployeeAwards = (record) => {
    setModalTitle("View Employee Awards");
    setModalContent(<ViewEmployeeAwardsData record={record} />);
    showModal();
  };

  // const ViewPDF = (record) => {
  //   return (
  //     <Document>
  //       <Page>
  //         <Text>sikeee</Text>
  //         <Text>name : {record.record.firstName}</Text>
  //         {record.record.awardsPhotos?.map((imageObj) => (
  //           <Image key={imageObj.awardsPhotoId} src={`${base}${imageObj.url}`} />
  //         ))}
  //       </Page>
  //     </Document>
  //   )
  // }

  const AwardsStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`awards/or/${record.awardsId}`)
        .then(function (response) {
          dispatch(getAwards());
          if (response.data === false) {
            toast.success('You Click In-Active');
          }
          else {
            toast.success('You Click Active');
          }
        })
        .catch(function (error) {
        });
    } else {
      toast.warn('InActive');
    }
  }

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
            {record?.status === false &&
              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => AwardsStatus(record)}
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
                onConfirm={() => AwardsStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmployeeAwards(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeeAwards(record)}>
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
      title: 'Employee Name',
      render: (record) => {
        console.log(record,'tttttt');
        const fullName = `${record.firstName} ${record.lastName}`;
        return <span>{fullName}</span>;
      },
    },
    {
      title: 'Award Type',
      dataIndex: 'awardsType',
    },
    {
      title: 'Cash',
      dataIndex: 'cash',
    }
  ]


  let TableContent;
  if (AwardSts === 'loading') {
    TableContent = <CommonLoading />
  } else if (AwardSts === 'succeeded') {
    const rowKey = (dataSource) => dataSource.awardsId
    TableContent = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (AwardSts === 'failed') {
    TableContent = <h2>{AwardError}</h2>
  }

  return (
    <Fragment>
      {TableContent}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
