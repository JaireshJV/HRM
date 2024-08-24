import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomModal } from '../../../../components/CustomModal'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle'
import { CompanyProfileTable } from './CompanyProfileTable'
import { CompanyProfileForm } from './CompanyProfileForm'
import { selectAllCompany, getCompany } from '../../../../Store/CustomSlice/CompanySlice'
import { useDispatch, useSelector } from 'react-redux'

export const CompanyProfileContainer = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompany())
  }, [dispatch])

  const Company = useSelector(selectAllCompany)


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

  const AddCompanyProfile = () => {
    setModalTitle("Add Company Profile");
    setModalContent(<CompanyProfileForm formname={'AddCompanyProfileForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  }

  return (

    <CustomCardView>

      <CustomPageFormTitle Heading={'View Company Profile'} />

      {
        Object.keys(Company).length === 0 ? (
          <Flex flexEnd={'true'} gap={'20px'} margin={'10px 0'}>
            <Button.Primary text={'+ Add'} onClick={AddCompanyProfile} />
          </Flex>
        ) : ("")
      }

      <CompanyProfileTable />

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />

    </CustomCardView>
  )
}
