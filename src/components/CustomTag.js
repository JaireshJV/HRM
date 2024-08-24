import React from 'react'
import { Tag as AntdTag } from 'antd'
import styled from 'styled-components'

const StyledTag = styled(AntdTag)`
    & h6{
        font-size:14px;
    }
`

export const CustomTag = ({ bordered, color, title }) => {

    return (
        <StyledTag bordered={bordered} color={color}>
            <h6>
                {title}
            </h6>
        </StyledTag>
    )
}
