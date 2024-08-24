import React, { useState } from 'react'
import { AddProjectTable } from './AddProjectTable'
import { AddProjectForm } from './AddProjectForm'
import Flex from '../../../../components/Flex'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle'
import Button from '../../../../components/Form/CustomButton'
import { CustomModal } from '../../../../components/CustomModal'

export const AddProjectContainer = () => {

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

    const AddNewProject = () => {
        setModalTitle("Add Project");
        setModalContent(<AddProjectForm  formname={'ProjectAddForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Project'} />

            <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
                <Button.Primary text={'+ Add '} onClick={AddNewProject} />
            </Flex>
            
            <AddProjectTable />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
