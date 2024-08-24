import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { AddProjectForm } from './AddProjectForm';
import { ViewAddProjecttData } from './ViewAddProductData';
import { CustomTable } from '../../../../components/CustomTable';
import { CustomTag } from '../../../../components/CustomTag';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, getProjectsError, getProjectsStatus, selectAllProjects } from '../../../../Store/CustomSlice/ProjectSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';
import request from '../../../../utils/request';
import { Popconfirm } from 'antd';

export const AddProjectTable = () => {

    const [dataSource, setDataSource] = useState([]);

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);


    const dispatch = useDispatch();

    const AllProjects = useSelector(selectAllProjects)
    const ProjectsStatus = useSelector(getProjectsStatus)
    const ProjectsError = useSelector(getProjectsError)

    useEffect(() => {
        dispatch(getProject());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllProjects);
    }, [AllProjects])

    // ===== Modal Functions Start =====

    const showModal = () =>
        setIsModalOpen(true);

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

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateProject = (record) => {
        setModalTitle("Update Project");
        setModalContent(<AddProjectForm formname={'ProjectUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updaterecord={record} />);
        showModal();
    };

    const ViewProject = (record) => {
        setModalTitle("View Project");
        setModalContent(<ViewAddProjecttData formname={'ProjectViewForm'} FormExternalClose={FormExternalClose} formReset={formReset} viewrecord={record} />);
        showModal();
    };

    const StatusProject = (record) => {

        if (record.status === false || record.status === true) {
            request
                .put(`project/or/${record.projectId}`)
                .then(function (response) {
                    dispatch(getProject());
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
                                onConfirm={() => StatusProject(record)}
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
                                onConfirm={() => StatusProject(record)}
                            >
                                <TableIconHolder color={THEME.red} size={'22px'}>
                                    <HiOutlineBellSlash />
                                </TableIconHolder>
                            </Popconfirm>}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewProject(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateProject(record) }}>
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
            title: 'Project Title',
            dataIndex: 'projectTitle',
        },
        {
            title: 'Client Name',
            dataIndex: 'customerName',
        },
        {
            title: 'Start Date',
            dataIndex: 'fromDate',
        },
        {
            title: 'End Date',
            dataIndex: 'toDate',
        },
        {
            title: 'Total Duration',
            dataIndex: 'totalDuration',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
        },
        {
            title: 'Location',
            dataIndex: 'city',
        },
        {
            title: 'Assigned To',
            render: (record, i) => {
                if (Array.isArray(record.designationName)) {
                    return (
                        <div>
                            {record.designationName.map((value, index) => (
                                <h3 key={index}>{value}, </h3>
                            ))}
                        </div>
                    );
                } else {
                    return null; 
                }
            },
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalProjectAmount',
        },
    ]

    let content;

    if (ProjectsStatus === 'loading') {
        content = <CommonLoading />
    } else if (ProjectsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.projectId;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (ProjectsStatus === 'failed') {
        content = <h2>
            {ProjectsError}
        </h2>
    }

    return (
        <Fragment>

            {content}

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
