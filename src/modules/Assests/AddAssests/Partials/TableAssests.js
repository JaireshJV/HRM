import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../../theme';
import { FiEdit } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { CustomTag } from '../../../../components/CustomTag';
import Flex from '../../../../components/Flex';
import { CustomModal } from '../../../../components/CustomModal';
import { TableIconHolder } from '../../../../components/CommonStyle/CommonStyled';
import { CustomTable } from '../../../../components/CustomTable';
import { Assests } from './Assests';
import { Popconfirm } from 'antd';
import { ViewAssestsTable } from './ViewAssestsTable';
import { AddBrandModal, AddKeyboardModal, AddMouseModal } from './AddAssetsModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAssest, getAssestError, getAssestStatus, getBrandType, getKeyboardType, getMouseType, selectAllAssest, selectAllBrandError, selectAllBrandStatus, selectAllBrandType, selectAllKeyBoardError, selectAllKeyBoardStatus, selectAllKeyBoardType, selectAllMouseError, selectAllMouseStatus, selectAllMouseType } from '../../../../Store/CustomSlice/AssestSlice';
import { CommonLoading } from '../../../../components/Form/CommonLoading';
import request from '../../../../utils/request';
import { CustomTabs } from '../../../../components/CustomTabs';


export const TableAssests = ({active, setActive}) => {

  const [assests, setAssests] = useState([])
  const [brand, setBrand] = useState([])
  const [keyBoard, setKeyBoard] = useState([])
  const [mouse, setMouse] = useState([])

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [trigger, setTrigger] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandType())
    dispatch(getKeyboardType())
    dispatch(getMouseType())
    dispatch(getAssest())
  }, [dispatch])

  const assest = useSelector(selectAllAssest)
  const assestStatus = useSelector(getAssestStatus)
  const assestError = useSelector(getAssestError)

  useEffect(() => {
    setAssests(assest)
  }, [assest])


  const brands = useSelector(selectAllBrandType)
  const brandStatus = useSelector(selectAllBrandStatus)
  const brandError = useSelector(selectAllBrandError)

  useEffect(() => {
    setBrand(brands)
  }, [brands])

  const keyboard = useSelector(selectAllKeyBoardType)
  const keyboardStatus = useSelector(selectAllKeyBoardStatus)
  const keyboardError = useSelector(selectAllKeyBoardError)

  useEffect(() => {
    setKeyBoard(keyboard)

  }, [keyboard])

  const mousebrand = useSelector(selectAllMouseType)
  const mouseStatus = useSelector(selectAllMouseStatus)
  const mouseError = useSelector(selectAllMouseError)

  useEffect(() => {
    setMouse(mousebrand)
  }, [mousebrand])






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

  const UpdateAssests = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Assests");
    setModalContent(<Assests updateRecord={record} FormExternalClose={FormExternalClose} formReset={formReset} updatetrigger={trigger} />);
    showModal();
  };

  const ViewAssests = (record) => {
    setModalTitle("View Assests");
    setModalContent(<ViewAssestsTable updateRecord={record} FormExternalClose={FormExternalClose} formReset={formReset} />);
    showModal();
  };

  const UpdateBrand = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Brand");
    setModalContent(<AddBrandModal updatetrigger={trigger} UpdateRecord={record} formname={'AddRoleUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} rolerecord={record} />);
    showModal();
  };

  const UpdateKeyboard = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update KeyBoard");
    setModalContent(<AddKeyboardModal updatetrigger={trigger} formname={'AddRoleUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} updateRecord={record} />);
    showModal();
  };

  const UpdateMouse = (record) => {
    setTrigger(trigger + 1)
    setModalTitle("Update Mouse");
    setModalContent(<AddMouseModal updateRecord={record} updatetrigger={trigger} formname={'AddRoleUpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} rolerecord={record} />);
    showModal();
  };

  const AssestStatus = (record) => {

    if (record.status === false || record.status === true) {
      request
        .put(`Assest/or/${record.assest_id}`)
        .then(function (response) {
          dispatch(getAssest());
          if (response.data === false) {
            toast.success('You Click In-Active');
          }
          else {
            toast.success('You Click Active');
          }
        })
        .catch(function (error) {
        });
    } else {
      toast.warn('InActive');
    }
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

            {record?.status === false &&
              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => AssestStatus(record)}
              >
                <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'}>
                  <HiOutlineBellAlert />
                </TableIconHolder>
              </Popconfirm>
            }
            {record?.status === true &&

              <Popconfirm
                title="Change The Status"
                description="Do you want to change the status into 'IN-ACTIVE'?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => AssestStatus(record)}
              >
                <TableIconHolder color={THEME.red} size={'22px'}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </Popconfirm>}

            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => ViewAssests(record)}>
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateAssests(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Status',

      render: (record, i) => {

        return (
          <Fragment>
            {record.status === true ? (
              <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
            ) : (<CustomTag bordered={"true"} color={'error'} title={'In - Active'} />)
            }
          </Fragment>
        );
      },
    },
    {
      title: 'Employee Name',
      render: (record) => {
        const fullName = `${record.first_name} ${record.last_name}`;
        return <span>{fullName}</span>;
      },
    },
    {
      title: 'Product  Name',
      dataIndex: 'product_name',
    },
    // {
    //   title: 'Serial  Number',
    //   dataIndex: 'serial_number',
    // },
    {
      title: 'Purchase Date',
      dataIndex: 'purchase_date',
    },
    // {
    //   title: 'Model Number',
    //   dataIndex: 'model_number',
    // },
    {
      title: 'Brand Name',
      dataIndex: 'brand_name',
    },
    {
      title: 'KeyBoard Brand Name',
      dataIndex: 'keyboard_brand_name',
    },
    {
      title: 'Mouse Brand Name',
      dataIndex: 'mouse_brand_name',
    },
    
  ]

  const BrandType = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateBrand(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Brand Type',
      dataIndex: 'brandName',
    }
  ]

  const KeyBoardType = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateKeyboard(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'KeyBoard Type',
      dataIndex: 'keyboardBrandName',
    }
  ]

  const MouseType = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={'10px'}>

            <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => UpdateMouse(record)}>
              <FiEdit />
            </TableIconHolder>

          </Flex>
        );
      },
    },
    {
      title: 'Mouse Type',
      dataIndex: 'mouseBrandName',
    }
  ]


  let content;

  if (assestStatus === 'loading') {
    content = <CommonLoading />
  } else if (assestStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.assest_id;
    content = <CustomTable columns={TableColumn} data={assests} rowKey={rowKey} />
  } else if (assestStatus === 'failed') {
    content = <h2>
      {assestError}
    </h2>
  }


  let content1;

  if (brandStatus === 'loading') {
    content1 = <CommonLoading />
  } else if (brandStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.brandId;
    content1 = <CustomTable columns={BrandType} data={brand} rowKey={rowKey} />
  } else if (brandStatus === 'failed') {
    content1 = <h2>
      {brandError}
    </h2>
  }

  let content2;

  if (keyboardStatus === 'loading') {
    content2 = <CommonLoading />
  } else if (keyboardStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.keyboardBrandId;
    content2 = <CustomTable columns={KeyBoardType} data={keyBoard} rowKey={rowKey} />
  } else if (keyboardStatus === 'failed') {
    content2 = <h2>
      {keyboardError}
    </h2>
  }

  let content3;

  if (mouseStatus === 'loading') {
    content3 = <CommonLoading />
  } else if (mouseStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.mouseBrandId;
    content3 = <CustomTable columns={MouseType} data={mouse} rowKey={rowKey} />
  } else if (mouseStatus === 'failed') {
    content3 = <h2>
      {mouseError}
    </h2>
  }

  useEffect(() => {
  dispatch(getAssest())
  dispatch(getBrandType())
  dispatch(getKeyboardType())
  dispatch(getMouseType())
  }, [active,dispatch])

  const tabs = [
    { label: 'Assests', content: content },
    { label: 'Brand Type', content: content1 },
    { label: 'Keyboard Type', content: content2 },
    { label: 'Mouse Type', content: content3 },
  ];

  




  return (
    <Fragment>
      {/* <CustomRow space={[12, 12]}>
        <Col span={24} md={24}>
          {content}
        </Col>

        <Col span={24} md={8}>
          {content1}
        </Col>

        <Col span={24} md={8}>
          {content2}

        </Col>

        <Col span={24} md={8}>
          <CustomTable columns={MouseType} data={mouse} />
          {content3}

        </Col>
      </CustomRow> */}
      <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={(e) => setActive(e)} />

      <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
