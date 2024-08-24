import React, { useState } from 'react'
import { CustomCardView } from '../../../components/CustomCardView';
import Flex from '../../../components/Flex';
import { CustomModal } from '../../../components/CustomModal';
import Button from '../../../components/Form/CustomButton';
import { CustomPageFormTitle } from '../../../components/CustomPageTitle';
import {CustomerAndClientForm} from './CustomerAndClientForm';
import {CustomerAndClientTable} from './CustomerAndClientTable'


export const CustomerAndClientContainer = () => {

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

  const AddCustomerAndClient = () => {
    setModalTitle("Add Customer And Client");
    setModalContent(<CustomerAndClientForm formname={'AddCustomerAndClient'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  }


  return (

    <CustomCardView>

      <CustomPageFormTitle Heading={'View Customer And Client'} />

      <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
                <Button.Primary text={'+ Add '} onClick={AddCustomerAndClient} />
            </Flex>

      <CustomerAndClientTable />

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />

    </CustomCardView>
  )
}
