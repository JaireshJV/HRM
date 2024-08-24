import React from 'react'
import { Input, Form } from 'antd'
import Label from './Label'
import styled from 'styled-components'
import { THEME } from '../../theme'

const { TextArea } = Input

const StyledItem = styled(Form.Item)`
  > div {
    text-align: left;
  }
  
  .ant-input{
    font-family: 'Poppins', sans-serif;
    font-size:1rem;
    border-color: ${THEME.primary_color} !important;
    border-radius: 10px;
    font-weight: 600 !important;
    position: relative;
    letter-spacing: 0.01em;
  }

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
    border-color: ${THEME.primary_color} !important;
  }

  .ant-input:focus,
  .ant-input-focused {
    border-color: ${THEME.primary_color};
    box-shadow: none;
  }

  .ant-input[disabled]{
    color:black;
  }

  .ant-input:hover {
    border-color: ${THEME.primary_color} !important;
  }

  & .ant-form-item-label > label > span {
    font-size: 1rem;
    font-weight:600;
  }
`

export const CustomTextArea = ({
    name,
    cols,
    type = 'text',
    placeholder,
    label,
    rules,
    required,
    rows = 4,
    ...rest
}) => {
    return (
        <StyledItem
            colon={false}
            required={false} 
            label={
                label && (
                    <Label required={required} showLock={rest.showLock}>
                        {label}
                    </Label>
                )
            }
            rules={rules}
            name={name}
            {...rest}
        >
            <TextArea
                cols={cols}
                {...rest}
                type={type}
                rows={rows}
                placeholder={placeholder}
                style={{ resize: 'none' }}
            />
        </StyledItem>
    )
}

