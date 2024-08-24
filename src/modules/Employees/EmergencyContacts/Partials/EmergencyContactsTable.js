import React, { Fragment, useState, useEffect } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { CustomTag } from '../../../../components/CustomTag';
import Flex from '../../../../components/Flex';
import { CustomModal } from '../../../../components/CustomModal';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { CustomTable } from '../../../../components/CustomTable';
import { CustomRow } from '../../../../components/CustomRow';
import { Col, Popconfirm } from 'antd';
import { EmergencyContactsForm } from './EmergencyContactsForm';
import { AddRelationType } from './EmergencyContactsModals';
import { ViewEmergencyContactsData } from './ViewEmergencyContactsData';
import { useDispatch, useSelector } from 'react-redux';
import { getEmergencyContact, getEmergencyError, getEmergencyStatus, getEmergencyType, getEmergencytypeError, getEmergencytypeStatus, selectAllEmergency, selectAllEmergencyType } from '../../../../Store/CustomSlice/SecondemployeeSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';
import request from '../../../../utils/request';

export const EmergencyContactsTable = () => {

    const [tableForm, setTableForm] = useState([])
    const [dataSource, setDataSource] = useState([])

    const [trigger, setTrigger] = useState(0)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

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

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    
    const FormExternalClosee = () => {
        handleOk();
    }


    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEmergencyContact())
    }, [dispatch])


    useEffect(() => {
        dispatch(getEmergencyType())
    }, [dispatch])

    const AllEmergency = useSelector(selectAllEmergency)
    const Emergencystatus = useSelector(getEmergencyStatus)
    const getEmergencyerror = useSelector(getEmergencyError)

    useEffect(() => {
        setDataSource(AllEmergency)
    }, [AllEmergency])


    const AllEmergencyType = useSelector(selectAllEmergencyType)
    const Emergencytypestatus = useSelector(getEmergencytypeStatus)
    const getEmergencytypeerror = useSelector(getEmergencytypeError)

    useEffect(() => {
        setTableForm(AllEmergencyType)
    }, [AllEmergencyType])

    const UpdateEmergencyContacts = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Emergency Contacts");
        setModalContent(<EmergencyContactsForm trigger={trigger} Record={record} formname={'EmergencyUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const UpdateRelationType = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Relation Type");
        setModalContent(<AddRelationType updatetrigger={trigger} updateRecord={record} formname={'RelationTypeUpdateForm'} FormExternalClose={FormExternalClose} FormExternalClosee={FormExternalClosee}  formReset={formReset} />);
        showModal();
    };

    const ViewEmergencyContacts = (record) => {
        setModalTitle("View Emergency Contacts");
        setModalContent(<ViewEmergencyContactsData viewRecord={record} formname={'ViewEmergencyForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };



    const StatusEmergency = (record) => {

        if (record.status === false || record.status === true) {
            request
                .put(`emergencycontacts/or/${record.emergency_contacts_id}`)
                .then(function (response) {
                    dispatch(getEmergencyContact());
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
                                onConfirm={() => StatusEmergency(record)}
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
                                onConfirm={() => StatusEmergency(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}
                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewEmergencyContacts(record)}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateEmergencyContacts(record)}>
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
            title: 'Employee Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Employee Relation Name',
            dataIndex: 'relatino_name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
        },
        {
            title: 'Relation Type',
            dataIndex: 'relation_type',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        }
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

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateRelationType(record)}>
                            <FiEdit />
                        </TableIconHolder>

                    </Flex>
                );
            },
        },
        {
            title: 'Relation Type',
            dataIndex: 'relationType',
        },
    ]

    let content;

    if (Emergencystatus === 'loading') {
        content = <CommonLoading />
    } else if (Emergencystatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.emergency_contacts_id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (Emergencystatus === 'failed') {
        content = <h2>
            {getEmergencyerror}
        </h2>
    }

    let content1;

    if (Emergencytypestatus === 'loading') {
        content1 = <CommonLoading />
    } else if (Emergencytypestatus === 'succeeded') {
        const rowKey = (tableform) => tableform.relationTypeId;
        content1 = <CustomTable columns={RelationTypeColumn} data={tableForm} rowKey={rowKey} />
    } else if (Emergencytypestatus === 'failed') {
        content1 = <h2>
            {getEmergencytypeerror}
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
