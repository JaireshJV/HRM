import { Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'
import { CustomTag } from '../../../../../components/CustomTag'
import { THEME } from '../../../../../theme'
import { TableIconHolder } from '../../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import Flex from '../../../../../components/Flex'
import { ViewCurrentlyTable } from './ViewCurrentlyTable'
import Label from '../../../../../components/Form/Label'
import { CustomInput } from '../../../../../components/Form/CustomInput'
import { CustomCardView } from '../../../../../components/CustomCardView'
import dayjs from 'dayjs';



export const CurrentlyAbsentTable = () => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    // ----- Define Form
    const [form] = Form.useForm();

    // ----------  Form Reset UseState ---------

    const FormExternalClose = () => {
        handleOk();
    }

    useEffect(() => {
        YearlyReports()
    }, [])

    const YearlyReports = () => {
        request
            .get('attendance/absent')
            .then(function (response) {
                toast.success(response.data);
                setDataSource(response.data);
                form.resetFields();
            })
            .catch(error => {});
    };
    
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const ViewMonthlyAttendance = (record) => {
        setModalTitle("View Absent");
        setModalContent(<ViewCurrentlyTable viewRecord={record} FormExternalClose={FormExternalClose} />);
        showModal();
    };

    const onFinish = (values) => {

       }

       const onFinishFailed = (errorInfo) => {
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
                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewMonthlyAttendance(record)} >
                            <AiOutlineEye />
                        </TableIconHolder>
                    </Flex>
                );
            },
        },

        {
            title: "Status",
            render: (record, i) => {
                return (
                    <Fragment>
                        <CustomTag
                            bordered={record.attstatus !== null}
                            color={record.attstatus ? 'processing' : 'error'}
                            title={record.attstatus ? 'Present' : 'Absent'}
                        />
                    </Fragment>
                );
            }
        },

        {
            title: 'Name',
            render: (record) => {
                const fullName = `${record.first_name} ${record.last_name}`;
                return <span>{fullName}</span>;
            },
        },
        {
            title: 'Designation Name',
            dataIndex: 'designation_name',
        },
        {
            title: 'Department Name',
            dataIndex: 'department_name',
        },


    ]

    return (
        <Fragment>

            <CustomCardView>
            <Form
            form={form}
            name="attendance"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                date: selectedDate,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
                <Flex spcPading flexEnd baseLine>
                    <Label>Date :&nbsp;&nbsp;</Label>
                    <CustomInput name={'date'} disabled={'true'} onChange={handleDateChange} />
                </Flex>
                <CustomTable data={dataSource} columns={columns} />
                <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
                </Form>
            </CustomCardView>
        </Fragment>
    )
}
