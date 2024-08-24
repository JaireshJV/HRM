import React, { Fragment, useState, useEffect } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { PayrollForm } from './PayrollForm'
import { ViewPayrollData } from './ViewPayrollData'
import { toast } from 'react-toastify'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { SelectAllPayrollType, getPayroll, getPayrollError, getPayrollStatus, getPayrollType, selectAllPayroll } from '../../../../Store/CustomSlice/PayrollSlice'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Popconfirm } from 'antd'
import { PayrollModal } from './PayrollModal'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { getEmployee } from '../../../../Store/CustomSlice/EmployeeSlice'
import request from '../../../../utils/request'


export const PayrollTable = () => {

  const [tableData, setTableData] = useState([]);
  const [dataSource, setDatasource] = useState([]);
  const [trigger, setTrigger] = useState(0);

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

  const UpdatePayroll = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Payroll");
    setModalContent(<PayrollForm trigger={trigger} updateRecord={record} formname={'PayrollUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const UpdatePayrollType = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Payment Type");
    setModalContent(<PayrollModal trigger={trigger} updateRecord={record} formname={'PayrollUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const ViewPayroll = (record) => {
    setModalTitle("View Payroll");
    setModalContent(<ViewPayrollData viewRecord={record} />);
    showModal();
  };

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPayroll())
    dispatch(getPayrollType())
    dispatch(getEmployee())
  }, [dispatch])



  const AllPayroll = useSelector(selectAllPayroll)
  const payrollStatus = useSelector(getPayrollStatus)
  const payrollError = useSelector(getPayrollError)

  const PaymentType = useSelector(SelectAllPayrollType)
  const paymentStatus = useSelector(getPayrollStatus)
  const paymentError = useSelector(getPayrollError)

  useEffect(() => {
    setTableData(AllPayroll)

  }, [AllPayroll])

  useEffect(() => {
    setDatasource(PaymentType)
  }, [PaymentType])

  const StatusPayroll = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`payroll/or/${record.pay_roll_id}`)
        .then(function (response) {
          dispatch(getPayroll());
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
                onConfirm={() => StatusPayroll(record)}
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
                onConfirm={() => StatusPayroll(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewPayroll(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdatePayroll(record)}>
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
      title: 'Total Deductions',
      dataIndex: 'total_deductions',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Current Salary',
      dataIndex: 'current_salary',
    },
    {
      title: 'Total Salary',
      dataIndex: 'total_salary',
    },
    {
      title: 'Allowance',
      dataIndex: 'allowance',
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment_type',
    },
  ]

  const RelationTypeColumn = [

    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdatePayrollType(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
    },
  ]

  let content;

  if (payrollStatus === 'loading') {
    content = <CommonLoading />
  } else if (payrollStatus === 'succeeded') {
    const rowKey = (tableData) => tableData.pay_roll_id;
    content = <CustomTable columns={TableColumn} data={tableData} rowKey={rowKey} />
  } else if (payrollStatus === 'failed') {
    content = <h2>
      {payrollError}
    </h2>
  }

  let content1;

  if (paymentStatus === 'loading') {
    content1 = <CommonLoading />
  } else if (paymentStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.paymentTypeId;
    content1 = <CustomTable columns={RelationTypeColumn} data={dataSource} rowKey={rowKey} />
  } else if (paymentStatus === 'failed') {
    content1 = <h2>
      {paymentError}
    </h2>
  }

  return (
    <Fragment>

      <CustomRow space={[12, 12]}>

        <Col span={24} md={24}>
          {content}
        </Col>

        <Col span={24} md={12}>
          {content1}
        </Col>

      </CustomRow>
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
