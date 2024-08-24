import React, { useState } from 'react'
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { CustomModal } from '../../../../components/CustomModal';
import { CustomCardView } from '../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle';
import { EmergencyContactsForm } from './EmergencyContactsForm';
import { EmergencyContactsTable } from './EmergencyContactsTable';

export const EmergencyContactsContainer = () => {

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

    const AddEmergencyContacts = () => {
        setModalTitle("Add Emergency Contacts");
        setModalContent(<EmergencyContactsForm formname={'EmergencyContactsAddForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Emergency Contacts'} />

            <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
                <Button.Primary text={'+ Add '} onClick={AddEmergencyContacts} />
            </Flex>
            
            <EmergencyContactsTable />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
