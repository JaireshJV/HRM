
import React, { useEffect, useState } from 'react'
import { HeaderIconHolder, BtnSideHolder, Logo } from './Style'
import { FaUserTie } from 'react-icons/fa'
import { AiOutlineBell, AiOutlineMenuUnfold } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CustomDropDownButton } from '../../components/Form/CustomDropDownButton'
import { THEME } from '../../theme'
import Flex from '../../components/Flex'
import { CustomModal } from '../../components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Form/CustomButton';
import { CustomRow } from '../../components/CustomRow';
import { CustomBadge } from '../../components/CustomBadge';
import { logOut } from '../../routes/Auth/authSlice';
import { getNotification, selectAllNotification } from '../../Store/CustomSlice/NotificationSlice';
import { ViewNotificationDetails } from '../../modules/Notification/ViewNotificationDetails';

export const NavHeader = ({ updateCollapse }) => {

    const [dataSource, setDataSource] = useState([])
    // const [widthh,setWidthh] = 

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [showDot, setShowDot] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotification())
    }, [dispatch])

    const notification = useSelector(selectAllNotification)

    useEffect(() => {
        setDataSource(notification)
    }, [notification])



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const AdminLogOut = () => {
        dispatch(logOut());
    }

    const LogOutModal = () => (
        <div>
            <h1 style={{ fontSize: '1.2rem' }}>Are you Sure You Want to Logout ?</h1>
            <br />
            <Flex gap={'20px'} W_100 center verticallyCenter>
                <Button.Success text={'Logout'} onClick={AdminLogOut} />
                <Button.Danger text={'Cancel'} onClick={handleOk} />
            </Flex>
        </div>
    )

    const onViewStudent = () => {
        setModalContent(<LogOutModal />);
        setModalTitle("Log Out");
        showModal();
    }

    const handleNotfModal = () => {
        setModalTitle("Notifications");
        setModalContent(<ViewNotificationDetails dataSource={dataSource} />);
        setShowDot(false);
        showModal();
    }

    const update = () => {
        updateCollapse();
    }

    const handleMenuClick = () => {
        onViewStudent();
    };

    const LoqOutBtn = () => (
        <Flex gap={'8px'} centervertically={'true'}> <BiLogOut />&nbsp;Logout</Flex>
    )

    const items = [
        {
            label: <LoqOutBtn />,
            key: '1',
            danger: true,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    return (
        <>
            <CustomRow style={{ alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

                <div>
                    <CustomRow style={{ alignItems: 'center' }}>
                        <Logo>
                            <span>
                                HRM - SYSTEM
                            </span>
                        </Logo>

                        <BtnSideHolder onClick={update} >
                            <AiOutlineMenuUnfold className='header__icon' />
                        </BtnSideHolder>

                    </CustomRow>
                </div>

                <HeaderIconHolder>

                    {dataSource?.length > 0 ? (
                        <CustomBadge
                            dot={showDot}
                            icon={
                                <AiOutlineBell
                                    style={{
                                        fontSize: 26,
                                        color: 'white',
                                    }}
                                    onClick={() => handleNotfModal()}
                                />
                            }
                        />
                    ) : (
                        <CustomBadge
                            icon={
                                <AiOutlineBell
                                    style={{
                                        fontSize: 26,
                                        color: 'white',
                                    }}
                                />
                            }
                        />
                    )}

                    <CustomDropDownButton menu={menuProps} bgcolor={'transparent'} placement="bottomLeft" trigger={['click']} icon={<FaUserTie size={22} />} color={THEME.white} />

                </HeaderIconHolder>

                <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />

            </CustomRow>
        </>
    )
}

