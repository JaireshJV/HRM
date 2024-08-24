import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker';
import { CustomAddSelect } from '../../../../components/Form/CustomAddSelect';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { AddBrandModal, AddKeyboardModal, AddMouseModal } from '../../../Assests/AddAssests/Partials/AddAssetsModal'
import { CustomSelect } from '../../../../components/Form/CustomSelect';
import { CustomModal } from '../../../../components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAssest, getKeyboardType, getMouseType, selectAllBrandType, selectAllKeyBoardType, selectAllMouseType } from '../../../../Store/CustomSlice/AssestSlice';
import { getEmployee, selectAllEmployee } from '../../../../Store/CustomSlice/EmployeeSlice';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import dayjs from 'dayjs'

export const Assests = ({ FormExternalClose, updateRecord, updatetrigger, formReset }) => {


  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [dataSource, setDataSource] = useState([]);
  const [keyboard, setKeyBoard] = useState([])
  const [mouse, setMouse] = useState([])


  // ----- Define Form
  const [form] = Form.useForm();

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  const dispatch = useDispatch()

  useEffect(() => {
    form.resetFields();
  }, [form,formReset])

  useEffect(() => {
    if (updateRecord) {
      SetAssestDetails()
    }
  }, [updateRecord, updatetrigger])

  const SetAssestDetails = () => {
    form.setFieldsValue(updateRecord)
    const purchasedate = new Date(updateRecord?.purchase_date);
    const dateFormat = 'YYYY/MM/DD';
    const purchse = dayjs(purchasedate).format(dateFormat);
    const fullName = `${updateRecord?.first_name} ${updateRecord?.last_name}`;

    form.setFieldsValue({
      employee_name: fullName,
      employeeId: updateRecord?.employee_id,
      productName: updateRecord?.product_name,
      purchaseDate: dayjs(purchse, dateFormat),
      serialNumber: updateRecord?.serial_number,
      modelNumber: updateRecord?.model_number,
      brandtype: updateRecord?.brand_name,
      brandId: updateRecord?.brand_id,
      keyboardBrandName: updateRecord?.keyboard_brand_name,
      keyboardBrandId: updateRecord?.keyboard_brand_id,
      mouseBrandName: updateRecord?.mouse_brand_name,
      mouseBrandId: updateRecord?.mouse_brand_id,
      countOfProducts: updateRecord?.count_of_products

    })
  }

  const brandtype = useSelector(selectAllBrandType)

  const keyboardbrand = useSelector(selectAllKeyBoardType)

  const MouseBrand = useSelector(selectAllMouseType)

  useEffect(() => {
    dispatch(getKeyboardType())
    dispatch(getMouseType())
    dispatch(getEmployee())
  }, [dispatch])

  useEffect(() => {
    setDataSource(brandtype)
  }, [brandtype])

  useEffect(() => {
    setKeyBoard(keyboardbrand)
  }, [keyboardbrand])

  useEffect(() => {
    setMouse(MouseBrand)
  }, [MouseBrand])

  const AssestDetails = useSelector(selectAllEmployee)

  const handleNameChange = (value) => {

    const SelectAssestDetails = AssestDetails.find(
      (item) => `${item.first_name} ${item.last_name}` === value
    );

    if (SelectAssestDetails) {
      form.setFieldsValue({ employeeId: SelectAssestDetails.employee_id });
    }
  };

  const empname = AssestDetails?.map((empdetails) => ({
    label: `${empdetails.first_name} ${empdetails.last_name}`,
    value: `${empdetails.first_name} ${empdetails.last_name}`
  }));

  const brandname = dataSource?.map((com) => ({ label: com.brandName, value: com.brandName }))



  const brandOnChanges = (value) => {
    const SelectedBrand = dataSource?.find((mem) => mem.brandName === value)
    form.setFieldsValue({ brandId: SelectedBrand?.brandId })
  }

  const keyboardname = keyboard?.map((com) => ({ label: com.keyboardBrandName, value: com.keyboardBrandName }))


  const keyboardOnChanges = (value) => {
    const SelectKeyboardName = keyboard?.find((mem) => mem.keyboardBrandName === value)
    form.setFieldsValue({ keyboardBrandId: SelectKeyboardName?.keyboardBrandId })
  }


  const Mousename = mouse?.map((com) => ({ label: com.mouseBrandName, value: com.mouseBrandName }))


  const MouseOnChanges = (value) => {
    const SelectMouseName = mouse?.find((mem) => mem.mouseBrandName === value)
    form.setFieldsValue({ mouseBrandId: SelectMouseName?.mouseBrandId })
  }

  const onReset = () => {
    form.resetFields();
  };


  const handleFromdate = (e) => {
    setSelectedDate(e);
  }

  const handleBrandClick = () => {
    setModalTitle('Add Brand Type');
    setModalContent(<AddBrandModal FormExternalClosee={FormExternalClosee} />);
    showModal()

  }


  const handleKeywordClick = () => {
    setModalTitle('Add KeyBoard Type');
    setModalContent(<AddKeyboardModal FormExternalClosee={FormExternalClosee} />);
    showModal()

  }

  const handleMouseClick = () => {
    setModalTitle('Add Mouse Type');
    setModalContent(<AddMouseModal FormExternalClosee={FormExternalClosee} />);
    showModal()

  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const FormExternalClosee = () => {
    handleOk();
  }


  const UpdateAssests = (values) => {
    request.put(`assest/editassest/${updateRecord?.assest_id}`, values)
      .then(function (response) {
        dispatch(getAssest());
        FormExternalClose();
        form.resetFields();
        toast.info('Assests Updated Successfully')
      })
      .catch(error => {})
  }


  const AddAssests = (values) => {
    request.post('Assest/save', values)
      .then(function (response) {
        toast.success("Assests Saved Successfully !");
        dispatch(getAssest());
        FormExternalClose();
        form.resetFields();
      })
      .catch(error => {})
  }


  const onFinish = (values) => { 
    const newValues = { ...values, purchaseDate: selectedDate }
    if (updateRecord) {
      UpdateAssests(newValues);
    }
    else {
      AddAssests(newValues);
    }
  };

  const onFinishFailed = (errorInfo) => {
  }



  return (
    <Form
      form={form}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomSelect label={'Employee Name'} options={empname} name={'employee_name'} onChange={handleNameChange}
            rules={[
              {
                required: true,
                message: 'Please enter Employee Name !',
              }
            ]}
          />
          <CustomInput name={'employeeId'} display={'none'} />


        </Col>
        <Col span={24} md={12}>
          <CustomInput label={'Product Name'} placeholder={'Product Name'} name={'productName'}
            rules={[
              {
                required: true,
                message: 'Please enter Product Name !',
              }
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput label={'Serial Number'} placeholder={'Serial Number'} name={'serialNumber'}
            rules={[
              {
                required: true,
                message: 'Please enter Serial Number!',
              }
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={'Purchase Date'}
            name={'purchaseDate'}
            onChange={handleFromdate}
            rules={[
              {
                required: true,
                message: 'Please enter Purchase Date !',
              }
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput label={'Model Number'} placeholder={'Model Number'} name={'modelNumber'}
            rules={[
              {
                required: true,
                message: 'Please enter Model Number !',
              }
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomAddSelect  label={'Brand Name'} options={brandname} name={'brandtype'} onButtonClick={handleBrandClick} onChange={brandOnChanges}
            rules={[
              {
                required: true,
                message: 'Please enter Brand Name !',
              }
            ]}
          />
          <CustomInput name={'brandId'} display={'none'} />

        </Col>

        <Col span={24} md={12}>
          <CustomAddSelect label={'KeyBoard Brand Name'} options={keyboardname} name={'keyboardBrandName'} onButtonClick={handleKeywordClick} onChange={keyboardOnChanges}
            rules={[
              {
                required: true,
                message: 'Please enter KeyBoard Brand Name !',
              }
            ]}
          />
          <CustomInput name={'keyboardBrandId'} display={'none'} />
        </Col>

        <Col span={24} md={12}>
          <CustomAddSelect  label={'Mouse Brand Name'} options={Mousename} name={'mouseBrandName'} onButtonClick={handleMouseClick} onChange={MouseOnChanges}
            rules={[
              {
                required: true,
                message: 'Please enter Mouse Brand Name !',
              }
            ]}
          />
          <CustomInput name={'mouseBrandId'} display={'none'} />
        </Col>

        {/* <Col span={24} md={12}>
          <CustomInput label={'Count Of Products'} placeholder={'Count Of Products'} name={'countOfProducts'}
            rules={[
              {
                required: true,
                message: 'Please enter Count Of Products !',
              }
            ]}
          />
        </Col> */}

      </CustomRow>

      <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
        {updateRecord ? (
          <>
            <Button.Primary text={'Update'} htmlType={'submit'} />
            <Button.Danger text={'Cancel'} onClick={() => FormExternalClose()} />
          </>
        ) : (
          <>
            <Button.Success text={'Submit'} htmlType={'submit'} />
            <Button.Danger text={'Reset'} onClick={() => onReset()} />
          </>
        )}
      </Flex>

      <CustomModal isVisible={isModalOpen} width={600} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />


    </Form>
  )
}

