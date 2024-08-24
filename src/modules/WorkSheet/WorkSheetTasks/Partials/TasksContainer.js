import React, { useState } from 'react'
import Flex from '../../../../components/Flex'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle'
import Button from '../../../../components/Form/CustomButton'
import { CustomModal } from '../../../../components/CustomModal'
import { TaskTable } from './TasksTable'
import { TaskForm } from './TasksForm'

export const TaskContainer = () => {

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

    const AddNewTasks = () => {
        setModalTitle("Add Task");
        setModalContent(<TaskForm formname={'TaskAddForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Task'} />
            
            <TaskTable />

            <Flex gap={'20px'} center={"true"} margin={'10px 0'}>
                <Button.Primary text={'Add'} onClick={AddNewTasks} />
            </Flex>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
