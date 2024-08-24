

import React, { useState } from 'react';
import { ContentHeader, ContentLayout, MainContent, MainLayout, SideBar } from './Partials/Style'
import { SideMenu } from './Partials/SideMenu';
import { NavHeader } from './Partials/NavHeader';


export const DashLayout = ({ children }) => {

    const [collapse, setCollapse] = useState(false)

    const updateCollapse = () => {
        setCollapse(!collapse)
    }

    console.log(collapse, 'llllllllll')

    return (
        <MainLayout >
            <ContentHeader>
                <NavHeader updateCollapse={updateCollapse} />
            </ContentHeader>

            <SideBar className={collapse && 'active'}>
                <SideMenu />
            </SideBar>
            <ContentLayout className={collapse && 'active'}>
                <MainContent>
                    {children}
                </MainContent>
            </ContentLayout>
        </MainLayout>
    )
};