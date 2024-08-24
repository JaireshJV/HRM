import React, { useState } from 'react'
import { EmployeeAwardsTable } from './EmployeeAwardsTable';
import { EmployeeAwardsForm } from './EmployeeAwardsForm';
import { CustomModal } from '../../../../components/CustomModal';
import Button from '../../../../components/Form/CustomButton';
import { CustomCardView } from '../../../../components/CustomCardView';
import Flex from '../../../../components/Flex';
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle';


export const EmployeeAwardsContainer = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // -------  Form Reset Funtion
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

  const AddEmployeeAwards = () => {
    setModalTitle("Add Employee Awards");
    setModalContent(<EmployeeAwardsForm formname={'AddEmployeeAwardsForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  }

  return (

    <CustomCardView>

      <CustomPageFormTitle Heading={'View Employee Awards'} />

      <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
        <Button.Primary text={'+ Add '} onClick={AddEmployeeAwards} />
      </Flex>

      <EmployeeAwardsTable />
      
      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />

    </CustomCardView>
  )
}
