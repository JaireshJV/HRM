import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
// import Page from '../../Modules/Page/Container/index'
import { adminAuthenticated } from '../config/user'
import Flex from '../../components/Flex'
import styled from 'styled-components'
import { DashLayout } from '../../layout/DashLayout'

const PageFlex = styled(Flex)`
  overflow: hidden;
`
export const AuthPage = ({ isAuthenticated }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin')
        }
    }, [navigate,isAuthenticated])

    return (
        <PageFlex>
            {isAuthenticated && (
                <DashLayout>
                    <Routes>
                        {adminAuthenticated.map(({ routePath, Component }) => {
                            return (
                                <Route
                                    key={routePath}
                                    path={routePath}
                                    element={<Component />}
                                ></Route>
                            )
                        })}
                    </Routes>
                </DashLayout>
            )}
        </PageFlex>
    )
}

