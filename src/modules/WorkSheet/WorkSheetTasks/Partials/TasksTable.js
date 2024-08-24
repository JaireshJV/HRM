import React, { Fragment, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { CustomTable } from '../../../../components/CustomTable';
import { CustomTag } from '../../../../components/CustomTag';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { TaskForm } from './TasksForm';
import { ViewTaskData } from './ViewTasksData';

export const TaskTable = () => {

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

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateTasks = () => {
        setModalTitle("Update Tasks");
        setModalContent(<TaskForm formname={'ProjectUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewTasks = () => {
        setModalTitle("View Tasks");
        setModalContent(<ViewTaskData formname={'TaskViewForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const StatusTasks = () => {
        toast.success('You Click Active')
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

                        <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'} onClick={StatusTasks}>
                            <HiOutlineBellAlert />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={StatusTasks}>
                            <HiOutlineBellSlash />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={ViewTasks}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={UpdateTasks}>
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
                        <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
                        <CustomTag bordered={"true"} color={'error'} title={'In - Active'} />
                    </Fragment>
                );
            },
        },
        {
            title: 'Project Title',
            dataIndex: 'project_title',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assigned_to',
        }
    ]

    const data = [{
        key: '1',
        project_title: 'Task',
        assigned_to:'Responsible'
    }]
    
    return (
        <Fragment>

            <CustomTable columns={TableColumn} data={data} />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
