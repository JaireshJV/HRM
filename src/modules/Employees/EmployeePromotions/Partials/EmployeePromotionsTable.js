import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { EmployeePromotionsForm } from './EmployeePromotionsForm'
import { ViewEmployeePromotionsData } from './ViewEmployeePromotionsData'
import { CustomTag } from '../../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getPromotions, getPromotionsError, getPromotionsStatus, selectAllPromotions } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { Popconfirm } from 'antd'
import request from '../../../../utils/request'


export const EmployeePromotionsTable = () => {

  const [dataSource, setDataSource] = useState([]);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [trigger, setTrigger] = useState(0);

  const dispatch = useDispatch();

  const AllPromotions = useSelector(selectAllPromotions)
  const PromotionsStatus = useSelector(getPromotionsStatus)
  const PromotionsError = useSelector(getPromotionsError)

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(AllPromotions);
  }, [AllPromotions])

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

  const UpdateEmployeePromotions = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Employee Promotions");
    setModalContent(<EmployeePromotionsForm formname={'EmployeePromotionsUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updaterecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const ViewEmployeePromotionDetails = (record) => {
    setModalTitle("View Employee Promotion Details");
    setModalContent(<ViewEmployeePromotionsData viewrecord={record} />);
    showModal();
  };

  const PromotionStatuss = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`promotions/or/${record.promotions_id}`)
        .then(function (response) {
          dispatch(getPromotions());
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
                onConfirm={() => PromotionStatuss(record)}
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
                onConfirm={() => PromotionStatuss(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewEmployeePromotionDetails(record) }}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmployeePromotions(record)}>
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
      title: 'Promoted Role',
      dataIndex: 'role_name',
    },
    {
      title: 'Promoted By',
      dataIndex: 'promotions_by',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    }
  ]

  let content;

  if (PromotionsStatus === 'loading') {
    content = <CommonLoading />
  } else if (PromotionsStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.promotions_id;
    content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (PromotionsStatus === 'failed') {
    content = <h2>
      {PromotionsError}
    </h2>
  }

  return (
    <Fragment>

      {content}

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
