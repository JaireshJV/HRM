import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { ViewProjectWorkData } from './ViewProjectWorkData'
import { ProjectWorkForm } from './ProjectWorkForm'
import { CustomTag } from '../../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectWork, getProjectWorkError, getProjectWorkStatus, selectAllProjectWork } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import request from '../../../../utils/request'
import { Popconfirm } from 'antd'


export const ProjectWorkTable = () => {

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

  const UpdateProjectWork = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Project Work");
    setModalContent(<ProjectWorkForm formname={'ProjectWorkUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateprojectwork={record} updatetrigger={trigger} />);
    showModal();
  };

  const ViewProjectWork = (record) => {
    setModalTitle("View Project Work");
    setModalContent(<ViewProjectWorkData viewprojectworkrecord={record} />);
    showModal();
  };
  const dispatch = useDispatch();


  const [dataSource, setDataSource] = useState([]);

  const AllProjectWork = useSelector(selectAllProjectWork);
  const ProjectWorkStatuss = useSelector(getProjectWorkStatus);
  const ProjectWorkError = useSelector(getProjectWorkError);

  useEffect(() => {
    dispatch(getProjectWork());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(AllProjectWork);
  }, [AllProjectWork])


  const ProjectWorkStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`ProjectWork/or/${record.projectWorkId}`)
        .then(function (response) {
          dispatch(getProjectWork());
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
                onConfirm={() => ProjectWorkStatus(record)}
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
                onConfirm={() => ProjectWorkStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewProjectWork(record) }}>
              <AiOutlineEye />
            </TableIconHolder>

            {record.work !== 'Completed' &&
              <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateProjectWork(record) }}>
                <FiEdit />
              </TableIconHolder>
            }
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
        const renderedNames = record.firstName.map((firstName, index) => {
          const fullName = `${firstName} ${record.lastName[index]}`;
          return <span key={index}>{fullName}{index !== record.firstName.length - 1 ? ', ' : ''}</span>;
        });
        return <div>{renderedNames}</div>;
      },
    },

    {
      title: 'Project Name',
      dataIndex: 'projectTitle',
    },
    {
      title: 'Project Status',
      dataIndex: 'work',
    },
    {
      title: 'Total Duration',
      render: (record, i) => {
        return (
          <>{record.duration} Days</>
        );  
      },
    },
    {
      title: 'Date Of Assigning',
      dataIndex: 'date',
    },
    {
      title: 'Employee Designation',
      render: (record, i) => {
        return (
          record.designationName.map((value) => (
            <h3>{value} ,</h3>
          ))
        )
      },
    }
  ]
  let content;

  if (ProjectWorkStatuss === 'loading') {
    content = <CommonLoading />
  } else if (ProjectWorkStatuss === 'succeeded') {
    const rowKey = (dataSource) => dataSource.projectWorkId;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (ProjectWorkStatuss === 'failed') {
    content = <h2>
      {ProjectWorkError}
    </h2>
  }

  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
