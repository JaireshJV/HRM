import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../components/CustomTable'
import { THEME } from '../../../theme'
import { TableIconHolder } from '../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../components/Flex'
import { CustomerAndClientForm } from './CustomerAndClientForm'
import { ViewCustomerAndClient } from './ViewCustomerAndClientData'
import { CustomModal } from '../../../components/CustomModal'
import { CustomTag } from '../../../components/CustomTag'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomer, getCustomerError, getCustomerStatus, getFormtype, selectAllCustomer, selectAllFormtype } from '../../../Store/CustomSlice/CustomerSlice'
import { CommonLoading } from '../../../components/Form/CommonLoading'
import CustomerAndClientModal from './CustomerAndClientModal'
import request from '../../../utils/request'
import { Col, Popconfirm } from 'antd'
import { CustomRow } from '../../../components/CustomRow'


export const CustomerAndClientTable = () => {

  const [dataSourceformtype, setDataSourceformtype] = useState([]);
  const [dataSourcecustomer, setDataSourcecustomer] = useState([]);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [trigger, setTrigger] = useState(0)

  const dispatch = useDispatch();

  const AllFormType = useSelector(selectAllFormtype)
  const AllCustomer = useSelector(selectAllCustomer)
  const CustomerStatus = useSelector(getCustomerStatus)
  const CustomerError = useSelector(getCustomerError)

  useEffect(() => {
    dispatch(getFormtype());

  }, [dispatch]);

  useEffect(() => {
    setDataSourceformtype(AllFormType);
  }, [AllFormType])

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    setDataSourcecustomer(AllCustomer);
  }, [AllCustomer])

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


  const UpdateClients = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Customer And Client");
    setModalContent(<CustomerAndClientForm formname={'CustomerAndClientUpdateForm'} FormExternalClose={FormExternalClose} clienttrigger={trigger} updatecustomer={record} formReset={formReset} />);
    showModal();
  };

  const ViewClientDetails = (record) => {
    setModalTitle("View Customer And Client");
    setModalContent(<ViewCustomerAndClient viewrecord={record} />);
    showModal();
  };

  const UpdateFormType = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Form Type");
    setModalContent(<CustomerAndClientModal updaterecord={record} FormExternalClose={FormExternalClose} formtypetrigger={trigger} />);
    showModal();
  };

  const ClientStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`customers/or/${record.customer_id}`)
        .then(function (response) {
          dispatch(getCustomer());
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
                onConfirm={() => ClientStatus(record)}
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
                onConfirm={() => ClientStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => (ViewClientDetails(record))}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => (UpdateClients(record))}>
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
          </Flex >
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
      dataIndex: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no1',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Form Type',
      dataIndex: 'form_type_name',
    }
  ]

  const TableFormType = [
    {
      title: 'Sr no',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateFormType(record) }}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Referal',
      dataIndex: 'formTypeName'
    },
  ]

  let content;

  if (CustomerStatus === 'loading') {
    content = <CommonLoading />
  } else if (CustomerStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.customer_id;
    content = <CustomTable columns={TableColumn} data={dataSourcecustomer} rowKey={rowKey} />
  } else if (CustomerStatus === 'failed') {
    content = <h2>
      {CustomerError}
    </h2>
  }

  let content2;

  if (CustomerStatus === 'loading') {
    content2 = <CommonLoading />
  } else if (CustomerStatus === 'succeeded') {
    const rowKey = (dataSourceformtype) => dataSourceformtype.formTypeId;
    content2 = <CustomTable columns={TableFormType} data={dataSourceformtype} rowKey={rowKey} />
  } else if (CustomerStatus === 'failed') {
    content2 = <h2>
      {CustomerError}
    </h2>
  }

  return (
    <Fragment>
      <CustomRow space={[12,12]}>
        <Col span={24} md={24}>
          {content}
        </Col>

        <Col span={24} md={12}>
          {content2}
        </Col>
      </CustomRow>
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
