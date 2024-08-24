import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { EmployeeTerminationsForm } from './EmployeeTerminationsForm'
import { ViewEmployeeTerminationsData } from './ViewEmployeeTerminationsData'
import { toast } from 'react-toastify'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { getTermination, getTerminationError, getTerminationStatus, selectAllTermination } from '../../../../Store/CustomSlice/SecondemployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { Popconfirm } from 'antd'
import request from '../../../../utils/request'


export const EmployeeTerminationsTable = () => {

  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0)
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTermination());
  }, [dispatch]);

  const AllTermination = useSelector(selectAllTermination)
  const TerminationStatus = useSelector(getTerminationStatus)
  const TerminationError = useSelector(getTerminationError)

  useEffect(() => {
    setDataSource(AllTermination);
  }, [AllTermination])


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

  const UpdateEmployeeTermination = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Employee Termination");
    setModalContent(<EmployeeTerminationsForm formname={'EmployeeTerminationsUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updatetermination={record} updatetrigger={trigger} />);
    showModal();
  };

  const ViewEmployeeTermination = (record) => {
    setModalTitle("View Employee Termination");
    setModalContent(<ViewEmployeeTerminationsData terminationrecord={record} />);
    showModal();
  };




  const TerminationStatuss = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`terminations/or/${record.terminations_id}`)
        .then(function (response) {
          dispatch(getTermination());
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
                onConfirm={() => TerminationStatuss(record)}
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
                onConfirm={() => TerminationStatuss(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}


            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewEmployeeTermination(record) }}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateEmployeeTermination(record) }}>
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
      title: 'Date',
      dataIndex: 'terminations_date',
    },
    {
      title: 'Reason',
      dataIndex: 'terminations_type',
    },
  ]

  let content;

  if (TerminationStatus === 'loading') {
    content = <CommonLoading />
  } else if (TerminationStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.terminations_id;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (TerminationStatus === 'failed') {
    content = <h2>
      {TerminationError}
    </h2>
  }

  return (
    <Fragment>
      {content}
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
