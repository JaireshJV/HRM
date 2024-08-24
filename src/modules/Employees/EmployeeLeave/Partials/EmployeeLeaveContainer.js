import React, { useState } from 'react'
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { CustomModal } from '../../../../components/CustomModal';
import { CustomCardView } from '../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle';
import { EmployeeLeaveTable } from './EmployeeLeaveTable';
import { EmployeeLeaveForm } from './EmployeeLeaveForm';

export const EmployeeLeaveContainer = () => {

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

    const AddEmployeeLeave = () => {
        setModalTitle("Add Employee Leave");
        setModalContent(<EmployeeLeaveForm formname={'EmployeeLeaveAddForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Employee Leave'} />

            <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
                <Button.Primary text={'+ Add '} onClick={AddEmployeeLeave} />
            </Flex>

            <EmployeeLeaveTable />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
