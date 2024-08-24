import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../components/CustomTable'
import { CustomModal } from '../../../../components/CustomModal'
import { THEME } from '../../../../theme'
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled'
import { AiOutlineEye } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import { ViewCompanyProfile } from './ViewCompanyProfile'
import { CompanyProfileForm } from './CompanyProfileForm'
import { useDispatch, useSelector } from 'react-redux'
import { getCompany, getCompanyError, getCompanyStatus, selectAllCompany } from '../../../../Store/CustomSlice/CompanySlice'
import { CommonLoading } from '../../../../components/Form/CommonLoading'

export const CompanyProfileTable = () => {

    const [dataSource, setDataSource] = useState([]);
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    // -------  Form Reset Funtion

    const [trigger, setTrigger] = useState(0);

    const dispatch = useDispatch();

    const AllCompany = useSelector(selectAllCompany)
    const CompanyStatus = useSelector(getCompanyStatus)
    const CompanyError = useSelector(getCompanyError)

    useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(AllCompany);
    }, [AllCompany])

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

    const UpdateCompanyProfile = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Company Profile");
        setModalContent(<CompanyProfileForm formname={'CompanyProfileUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updatecompanyrecord={record} updatetrigger={trigger} />);
        showModal();
    };

    const ViewCompanyProfileDetails = (record) => {
        setModalTitle("View Company Profile");
        setModalContent(<ViewCompanyProfile viewcompanyrecord={record} />);
        showModal();
    };

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

                        {/* <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'} onClick={CompanyStatusClick}>
                            <HiOutlineBellAlert />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={CompanyStatusClick}>
                            <HiOutlineBellSlash />
                        </TableIconHolder> */}

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { ViewCompanyProfileDetails(record) }}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateCompanyProfile(record) }}>
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
        // {
        //     title: 'Status',
        //     render: (record, i) => {
        //         return (
        //             <Fragment>
        //                 <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
        //                 <CustomTag bordered={"true"} color={'error'} title={'In - Active'} />
        //             </Fragment>
        //         );
        //     },
        // },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber1',
        },
        {
            title: 'Location',
            dataIndex: 'location',
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

    let content;

    if (CompanyStatus === 'loading') {
        content = <CommonLoading />
    } else if (CompanyStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.id;
        content = <CustomTable columns={TableColumn} data={dataSource} rowKey={rowKey} pagination={false}/>
    } else if (CompanyStatus === 'failed') {
        content = <h2>
            {CompanyError}
        </h2>
    }

    return (
        <Fragment>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
