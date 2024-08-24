import React, { Fragment, useState } from 'react'
import { CustomTable } from '../../../components/CustomTable'
import Flex from '../../../components/Flex'
import { AiOutlineEye } from "react-icons/ai";
import { TableIconHolder } from '../../../components/CommonStyle/CommonStyled';
import { THEME } from '../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { CustomTag } from '../../../components/CustomTag';
import { CustomModal } from '../../../components/CustomModal'
import { ExampleForm } from './ExampleForm';
import { ExampleViewCompayData } from './ExampleViewCompayData';
import { toast } from 'react-toastify';

export const ExampleTable = () => {

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

    const UpdateCompany = () => {
        setModalTitle("Update Company");
        setModalContent(<ExampleForm formname={'UpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewCompanyDetails = () => {
        setModalTitle("View Company");
        setModalContent(<ExampleViewCompayData formname={'UpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewCompany = () => {
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

                        <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellAlert />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellSlash />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={ViewCompanyDetails}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={UpdateCompany}>
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
            title: 'Product Name',
            dataIndex: 'productname',
        }
    ]

    const data = [{
        key: '1',
        productname: 'Coin'
    }]
    
    return (
        <Fragment>

            <CustomTable columns={TableColumn} data={data} />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
