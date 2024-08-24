
import { Fragment, useState } from 'react'
import { CustomModal } from '../../../../components/CustomModal';
import { CustomTable } from '../../../../components/CustomTable';
import { CustomTag } from '../../../../components/CustomTag';
import { AiOutlineEye } from 'react-icons/ai';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import Flex from '../../../../components/Flex';
import { THEME } from '../../../../theme';
import { ViewUpdatedAttendance } from './ViewUpdatedAttendance';



export const LeaveTable = ({ dataSource }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormExternalClose = () => {
        handleOk();
    }


    const ViewAttendance = (record) => {
        setModalTitle("View Attendance");
        setModalContent(<ViewUpdatedAttendance viewRecord={record}  FormExternalClose={FormExternalClose}  />);
        showModal();
    };

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={()=>ViewAttendance(record)}  >
                            <AiOutlineEye />
                        </TableIconHolder>

                    </Flex>
                );
            },
        },
        {
            title:"Status",
            render:(record, i) => {
              return (
                <Fragment>
                  <CustomTag
                    bordered={record.attstatus !== null}
                    color={record.attstatus ? 'processing' : 'error'}
                    title={record.attstatus ? 'Present' : 'Absent'}
                  />
                </Fragment>
              );
            }},
        {
            title: 'Employee ID',
            dataIndex: 'employee_id',
        },
        {
            title: 'Employee Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Designation',
            dataIndex: 'designation_name',
        },
        {
            title: 'Section',
            dataIndex: 'section',
        },
        {
            title: 'In-Time',
            dataIndex: 'intime',
        },
        {
            title: 'Out-Time',
            dataIndex: 'outtime',
        },
    ]



    // let content;

    // if (projectStatus === 'loading') {
    //     content = <CommonLoading />
    // } else if (projectStatus === 'succeeded') {
    //     const rowKey = (dataSource) => dataSource.id;
    //     content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    // } else if (projectStatus === 'failed') {
    //     content = <h2>
    //         {projectError}
    //     </h2>
    // }


    return (
        <Fragment>
            {/* {content} */}
            <CustomTable data={dataSource} columns={columns} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
