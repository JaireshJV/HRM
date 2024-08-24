import React, { Fragment } from 'react'
import Label from './Label'
import styled from 'styled-components'
import { THEME } from '../../theme'
import { InputNumber as AntdInputNumber, Form } from 'antd'

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
  } 

  border-radius: 10px;
  margin-bottom: 5px !important;

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    font-size: 0.95rem;
    font-weight: 600 !important;
  }
`

export const AntdInputNumberStyle = styled(AntdInputNumber)`
  
  width: 100%;
  font-family:  'Poppins', sans-serif;
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: 10px;
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#8056F7')};

  & .ant-input-number-input:placeholder-shown {
    font-size:14px;
    text-align:${props => props.placed ? 'center' : 'start'};
  }
  
  ::placeholder {
    font-size: 14px;
    color:red;
  }

  :focus {
    border-color: ${THEME.primary_color};
    box-shadow: none;
  }

  :hover {
    border-color: ${THEME.primary_color};
  }

  :not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${THEME.primary_color} !important;
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-right-width: 0px !important;
  }

  .ant-input-number-prefix {
    color: #dbdbdb;
  }

  .ant-input-number-input {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    text-align:${props => props.placed || 'start'};
    height:100%;
    color: ${THEME.HEADING};
  }

  .ant-input-number-handler-wrap {
    opacity: unset;
    border-radius: 0 8px 8px 0;
    padding-top: 4px;
  }

  .ant-input-number-input-wrap{
    height:100%;
  }

  .ant-input-number-handler {
    width: 20px;
    height: 12px;
    color: #989898;
  }

  .ant-input-number-handler-up,
  .ant-input-number-handler-down {
    background: #ededed;
    margin-bottom: 2px;
    border-radius: 3px;
    margin-top: 2px;
  }

  .ant-input-number-handler-up:hover,
  .ant-input-number-handler-down:hover {
    height: 12px !important;
  }

  &.ant-input-number:hover .ant-input-number-handler-wrap{
    opacity: 0 !important;
  }
  
  &.ant-input-number:focus .ant-input-number-handler-wrap{
    opacity: 0 !important;
  }

  .ant-input-number-handler-wrap{
    opacity: 0;
  }

  .ant-input-number-focused .ant-input-number-handler-wrap {
    opacity: 0 !important;
  }

  &.ant-input[disabled] {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    border:1px solid ${THEME.primary_color} !important;
  }
`

export const CustomInputNumber = ({
    label,
    type,
    name,
    rules,
    step,
    display,
    onChange,
    placeholder,
    required,
    autoFocus,
    disabled,
    readOnly,
    width,
    precision,
    height,
    marginRight,
    labelStyle,
    defaultValue,
    placed,
    minWidth,
    optional,
    noStyle = undefined,
    ...rest
}) => {

    return (
        <StyledItem
            style={{
                width: width,
                marginRight: marginRight,
                minWidth: minWidth,
                display: display,
            }}
            rules={rules}
            noStyle={noStyle}
            name={name}
            colon={false}
            required={false}
            label={
                label && (
                    <Fragment>
                        <Label required={required} labelStyle={labelStyle}>
                            {label} <span>{optional}</span>
                        </Label>
                    </Fragment>
                )
            }
        >
            <AntdInputNumberStyle
                {...rest}
                defaultValue={defaultValue}
                placed={placed}
                type={type}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                height={height}
                step={step}
                precision={precision}
            />
        </StyledItem>
    )
}

