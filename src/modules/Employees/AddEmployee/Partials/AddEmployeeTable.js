import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { CustomModal } from '../../../../components/CustomModal'
import { ViewAddedEmployeeData } from './ViewAddedEmployee'
import { AddEmployeeForm } from './AddEmployeeForm'
import { AddDepartmentModal, AddDesignationModal, AddRoleModal } from './AddEmployeeModals'
import { CustomTag } from '../../../../components/CustomTag'
import { useDispatch, useSelector } from 'react-redux'
import { SelectViewEmployees, getAllEmployee, getDepartment, getDepartmentError, getDepartmentStatus, getDesignation, getEmployeeError, getEmployeeStatus, getRole, getViewEmployeeError, getViewEmployeeStatus, selectAllDepartment, selectAllDesignation, selectAllRole } from '../../../../Store/CustomSlice/EmployeeSlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'
import { CustomTabs } from '../../../../components/CustomTabs'


export const AddEmployeeTable = ({active, setActive}) => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [trigger, setTrigger] = useState(0);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
    console.log('closed');
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

  const UpdateEmployee = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Added Employee");
    setModalContent(<AddEmployeeForm formname={'AddEmployeeUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateEmployeeRecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const UpdateRole = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Role");
    setModalContent(<AddRoleModal formname={'AddRoleUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} rolerecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const UpdateDesignation = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Designation");
    setModalContent(<AddDesignationModal formname={'AddDesignationUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} designationrecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const UpdateDepartment = (record) => {
    // console.log();
    setTrigger(trigger + 1)
    setModalTitle("Update Department");
    setModalContent(<AddDepartmentModal formname={'AddDepartmentUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} departmentrecord={record} updatetrigger={trigger} />);
    showModal();
  };

  const ViewEmployeeDetails = (record) => {
    setModalTitle("View Employee Details");
    setModalContent(<ViewAddedEmployeeData viewEmployeerecord={record} />);
    showModal();
  };

  const dispatch = useDispatch();

  // table data 

  const [dataSource, setDataSource] = useState([]);

  const AllEmployee = useSelector(SelectViewEmployees);
  const EmployeeStatus = useSelector(getViewEmployeeStatus);
  const EmployeeError = useSelector(getViewEmployeeError);

  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(AllEmployee);
  }, [AllEmployee])


  // role data source 

  const [roleDataSource, setRoleDataSource] = useState([]);

  const AllRole = useSelector(selectAllRole);
  const RoleStatus = useSelector(getEmployeeStatus);
  const RoleError = useSelector(getEmployeeError);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  useEffect(() => {
    setRoleDataSource(AllRole);
  }, [AllRole])

  // Designation data source 

  const [designationDataSource, setDesignationDataSource] = useState([]);

  const AllDesignation = useSelector(selectAllDesignation);
  const DesignationStatus = useSelector(getEmployeeStatus);
  const DesignationError = useSelector(getEmployeeError);

  useEffect(() => {
    dispatch(getDesignation());
  }, [dispatch]);

  useEffect(() => {
    setDesignationDataSource(AllDesignation);
  }, [AllDesignation])

  const [departmentDataSource, setDepartmentDataSource] = useState([]);

  const department = useSelector(selectAllDepartment)
  const departmentStatus = useSelector(getDepartmentStatus)
  const departmentError = useSelector(getDepartmentError)

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  useEffect(() => {
    setDepartmentDataSource(department)
  }, [department])

  // const EmpStatus = (record) => {

  //   if (record.status === false || record.status === true) {
  //     request
  //       .put(`employees/or/${record.employee_id}`)
  //       .then(function (response) {
  //         dispatch(getEmployee());
  //         if (response.data === false) {
  //           toast.success('You Click In-Active');
  //         }
  //         else {
  //           toast.success('You Click Active');
  //         }
  //       })
  //       .catch(function (error) {
  //       });
  //   } else {
  //     toast.warn('InActive');
  //   }
  // }

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

            {/* {record?.status === false &&
              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => EmpStatus(record)}
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
                onConfirm={() => EmpStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>} */}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewEmployeeDetails(record) }}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateEmployee(record) }}>
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
      title: 'Email ID',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Designation',
      dataIndex: 'designation_name',
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
    },

  ]

  const RoleColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateRole(record) }}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
    }
  ]

  const DesignationColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateDesignation(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Designation',
      dataIndex: 'designationName',
    }
  ]

  const DepartmentColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateDepartment(record)} >
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Department',
      dataIndex: 'departmentName',
    }
  ]

  let content1;

  if (EmployeeStatus === 'loading') {
    content1 = <CommonLoading />
  } else if (EmployeeStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.employee_id;
    content1 = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (EmployeeStatus === 'failed') {
    content1 = <h2>
      {EmployeeError}
    </h2>
  }

  let content2;

  if (RoleStatus === 'loading') {
    content2 = <CommonLoading />
  } else if (RoleStatus === 'succeeded') {
    const rowKey = (roleDataSource) => roleDataSource.roleId;
    content2 = <CustomTable columns={RoleColumn} data={roleDataSource} rowKey={rowKey} />
  } else if (RoleStatus === 'failed') {
    content2 = <h2>
      {RoleError}
    </h2>
  }

  let content3;

  if (DesignationStatus === 'loading') {
    content3 = <CommonLoading />
  } else if (DesignationStatus === 'succeeded') {
    const rowKey = (designationDataSource) => designationDataSource.designationId;
    content3 = <CustomTable columns={DesignationColumn} data={designationDataSource} rowKey={rowKey} />
  } else if (DesignationStatus === 'failed') {
    content3 = <h2>
      {DesignationError}
    </h2>
  }

  let content4;

  if (departmentStatus === 'loading') {
    content4 = <CommonLoading />
  } else if (departmentStatus === 'succeeded') {
    const rowKey = (departmentDataSource) => departmentDataSource.DepartmentId;
    content4 = <CustomTable columns={DepartmentColumn} data={departmentDataSource} rowKey={rowKey} />
  } else if (departmentStatus === 'failed') {
    content4 = <h2>
      {departmentError}
    </h2>
  }


  useEffect(() => {
    dispatch(getAllEmployee())
    dispatch(getRole())
    dispatch(getDesignation())
    dispatch(getDepartment())
  }, [active,dispatch])

  const tabs = [
    { label: 'Total Employees', content: content1 },
    { label: 'Employee Role', content: content2 },
    { label: 'Employee Designation', content: content3 },
    { label: 'Employee Department', content: content4 },
  ];

  return (
    <Fragment>

      <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={(e) => setActive(e)} />
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
