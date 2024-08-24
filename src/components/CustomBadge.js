import { Badge as AntdBadge } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { THEME } from '../theme'

export const CustomBadge = ({ dot, icon }) => {
    return (

        <StyledBadge dot={dot}>
            {icon}
        </StyledBadge>
    )
}

export const StyledBadge = styled(AntdBadge)`
    width:32px;
    height:32px;
    background:${THEME.secondary_color};
    border-radius:6px;
    transition: 0.5s;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    &:hover svg path{
        color:${THEME.white};
    }
`       
