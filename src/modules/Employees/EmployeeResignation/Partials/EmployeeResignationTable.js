import React, { Fragment, useState, useEffect } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { EmployeeResignationForm } from './EmployeeResignationForm'
import { ViewEmployeeResignationData } from './ViewEmployeeResignationData'
import { toast } from 'react-toastify'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { getResignation, getResignationError, getResignationStatus, selectAllResignation } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { Popconfirm } from 'antd'
import request from '../../../../utils/request'




export const EmployeeResignationTable = () => {

  const [dataSource, setDataSource] = useState([])

  const dispatch = useDispatch();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // -------  Form Reset Funtion

  const [trigger, setTrigger] = useState(0);

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

  const Design = useSelector(selectAllResignation)
  const DesignStatus = useSelector(getResignationStatus)
  const DesignError = useSelector(getResignationError)

  useEffect(() => {
    dispatch(getResignation())
  }, [dispatch])

  useEffect(() => {
    setDataSource(Design)
  }, [Design])


  const UpdateEmployeeResignation = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Employee Resignation");
    setModalContent(<EmployeeResignationForm updatetrigger={trigger} updateRecord={record} formname={'AddEmployeeUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const ViewEmployeeResignation = (record) => {
    setModalTitle("View Employee Resignation");
    setModalContent(<ViewEmployeeResignationData handleRecord={record} />);
    showModal();
  };

  const ResignationStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`resignations/or/${record.resignations_id}`)
        .then(function (response) {
          dispatch(getResignation());
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
                onConfirm={() => ResignationStatus(record)}
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
                onConfirm={() => ResignationStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmployeeResignation(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeeResignation(record)}>
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
        const fullName = `${record.first_name} ${record.last_name}`;
        return <span>{fullName}</span>;
      },
    },
    {
      title: 'Resignation Date',
      dataIndex: 'resignations_date',
    },
    {
      title: 'Notice from Date',
      dataIndex: 'notice_date',
    },
    {
      title: 'Notice to Date',
      dataIndex: 'to_date',
    },
    {
      title: 'Notice Period',
      dataIndex: 'durations',
    }
  ]

  let content;

  if (DesignStatus === 'loading') {
    content = <CommonLoading />
  } else if (DesignStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.resignations_id;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (DesignStatus === 'failed') {
    content = <h2>
      {DesignError}
    </h2>
  }

  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
