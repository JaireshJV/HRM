import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { CustomModal } from '../../../../components/CustomModal'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { AnnouncementForm } from './AnnouncementForm'
import { ViewAnnoumcementModal } from './ViewAnnoumcementModal'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getAnnouncement, getAnnouncementError, getAnnouncementStatus, selectAllAnnouncement } from '../../../../Store/CustomSlice/CompanySlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { CustomTag } from '../../../../components/CustomTag'
import request from '../../../../utils/request'
import { Popconfirm } from 'antd'

export const AnnouncementTable = () => {

  // table data 



  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [trigger, setTrigger] = useState(0);

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
  }

  const FormCancelRest = () => {
    setFormReset(formReset + 1)
  }

  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);

  const AllAnnouncement = useSelector(selectAllAnnouncement);
  const AnnouncementStatus = useSelector(getAnnouncementStatus);
  const AnnouncementError = useSelector(getAnnouncementError);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(AllAnnouncement);
  }, [AllAnnouncement])

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

  const UpdateAnnouncement = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Announcement");
    setModalContent(<AnnouncementForm formname={'AnnouncementUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateAnnounceRecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const ViewAnnouncementDetails = (record) => {
    setModalTitle("View Announcement");
    setModalContent(<ViewAnnoumcementModal viewannouncementrecord={record} />);
    showModal();
  };

  const AnnouncementStatusClick = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`announcement/or/${record.announcement_id}`)
        .then(function (response) {
          dispatch(getAnnouncement());
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
                onConfirm={() => AnnouncementStatusClick(record)}
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
                onConfirm={() => AnnouncementStatusClick(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewAnnouncementDetails(record) }}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateAnnouncement(record) }}>
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
      title: 'Title For Announcement',
      dataIndex: 'title',
    },
    {
      title: 'From Date',
      dataIndex: 'from_date',
    },
    {
      title: 'To Date',
      dataIndex: 'to_date',
    },
    {
      title: 'Informed By',
      dataIndex: 'informed_by',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
    }

  ]

  let content;

  if (AnnouncementStatus === 'loading') {
    content = <CommonLoading />
  } else if (AnnouncementStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.announcement_id;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (AnnouncementStatus === 'failed') {
    content = <h2>
      {AnnouncementError}
    </h2>
  }

  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
