import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { ProjectReportForm } from './ProjectReportForm'
import { ViewProjectReportData } from './ViewProjectReportData'
import { CustomTag } from '../../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectReport, getProjectReportStatus, getProjectreportError,selectAllProjectreport } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import request from '../../../../utils/request'
import { Popconfirm } from 'antd'


export const ProjectReportTable = () => {

  const [tableDate, setTableData] = useState([])

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectReport())
  }, [dispatch])

  const projectreport = useSelector(selectAllProjectreport)
  const projectreportstatus = useSelector(getProjectReportStatus)
  const projectreporterror = useSelector(getProjectreportError)

  useEffect(() => {
    setTableData(projectreport)
  }, [projectreport])




  const UpdateProjectReport = (record) => {
    setModalTitle("Update Project Report");
    setModalContent(<ProjectReportForm updateRecord={record} formname={'ProjectReportUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const ViewProjectReport = (record) => {
    setModalTitle("View Project Report");
    setModalContent(<ViewProjectReportData updateRecord={record} />);
    showModal();
  };


  const ReportStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`projectreport/or/${record.project_report_id}`)
        .then(function (response) {
          dispatch(getProjectReport());
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
                onConfirm={() => ReportStatus(record)}
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
                onConfirm={() => ReportStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewProjectReport(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateProjectReport(record)}>
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
      title: 'Project Name',
      dataIndex: 'project_title',
    },
    {
      title: 'Project Date Given',
      dataIndex: 'date_give',
    },
    {
      title: 'Project Date Extended',
      dataIndex: 'extended_date',
    },
    {
      title: 'Total Project Duration Days',
      dataIndex: 'duration',
    },

  ]

  // const data = [{
  //   key: '1',
  //   employee_name: "MIKE",
  //   project_name: "Project  ",
  // }]

  let content;

  if (projectreportstatus === 'loading') {
    content = <CommonLoading />
  } else if (projectreportstatus === 'succeeded') {
    const rowKey = (tableDate) => tableDate.project_report_id;
    content = <CustomTable columns={TableColumn} data={tableDate} rowKey={rowKey} />
  } else if (projectreportstatus === 'failed') {
    content = <h2>
      {projectreporterror}
    </h2>
  }


  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
