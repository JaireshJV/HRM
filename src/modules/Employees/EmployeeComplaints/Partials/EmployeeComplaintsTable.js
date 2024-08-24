import React, { Fragment, useState, useEffect } from 'react'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { CustomTable } from '../../../../components/CustomTable'
import { EmployeeComplaintsForm } from './EmployeeComplaintsForm'
import { ViewEmployeeComplaintsData } from './ViewEmployeeComplaintsData'
import { toast } from 'react-toastify'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaint, getComplaintStatus, selectAllComplaint } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { Popconfirm } from 'antd'
import request from '../../../../utils/request'

export const EmployeeComplaintsTable = () => {

  const [dataSource, setDataSource] = useState([])

  const [trigger, setTrigger] = useState(0);


  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // -------  Form Reset Funtion

  const dispatch = useDispatch();

  const Complaints = useSelector(selectAllComplaint)
  const complaintstatus = useSelector(getComplaintStatus)


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

  useEffect(() => {
    setDataSource(Complaints)
  }, [Complaints])

  useEffect(() => {
    dispatch(getComplaint())
  }, [dispatch])

  const UpdateEmployeeComplaints = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Employee Complaints");
    setModalContent(<EmployeeComplaintsForm updatetrigger={trigger} formname={'EmployeeComplaintsUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateRecord={record} />);
    showModal();
  };

  const ViewEmployeeComplaints = (record) => {
    setModalTitle("View Employee Complaints");
    setModalContent(<ViewEmployeeComplaintsData handleRecord={record} />);
    showModal();
  };



  const ComplaintStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`complaints/or/${record.complaints_id}`)
        .then(function (response) {
          dispatch(getComplaint());
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
                onConfirm={() => ComplaintStatus(record)}
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
                onConfirm={() => ComplaintStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmployeeComplaints(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeeComplaints(record)}>
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
            {record.status === true ? (
              <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
            ) : (<CustomTag bordered={"true"} color={'error'} title={'In - Active'} />)
            }
          </Fragment>
        );
      },
    },
    {
      title: 'Complaint Against',
      dataIndex: 'complaints_against',
    },
    {
      title: 'Complaint Title',
      dataIndex: 'complaints_title',
    },
    {
      title: 'Date',
      dataIndex: 'complaints_date',
    },
    {
      title: 'Name',
      render: (record) => {
        const fullName = `${record.first_name} ${record.last_name}`;
        return <span>{fullName}</span>;
      },
    },

  ]

  let content;

  if (complaintstatus === 'loading') {
    content = <CommonLoading />
  } else if (complaintstatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.complaints_id;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (complaintstatus === 'failed') {
    content = <h2>
      {complaintstatus}
    </h2>
  }

  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
