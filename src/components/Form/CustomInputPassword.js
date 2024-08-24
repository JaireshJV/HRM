/* eslint-disable */
import React, { Fragment } from 'react'
import { Input as AntdInput, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'

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
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const AntdInputStyle = styled(AntdInput.Password)`

  font-family:  'Poppins', sans-serif;
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: 10px;
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#8056F7')};

  ::placeholder {
    font-size: 14px;
  }
  
  :focus {
    border:1px solid ${THEME.primary_color};
    box-shadow: none;
  }

  .ant-input-suffix{
    padding:2px;
  }

  .ant-input-suffix span{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ant-input-suffix:hover, 
  .ant-input-suffix .anticon.ant-input-password-icon,
  .ant-input-suffix .anticon.ant-input-password-icon:hover
  {
    border:none !important;
  }
  :hover {
    border:1px solid ${THEME.primary_color};
  }

  :not(.ant-input-affix-wrapper-disabled):hover {
    /* border:1px solid ${THEME.primary_color} !important; */
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-right-width: 0px !important;
  }

  .ant-input{
    font-weight:600;
  }

  &.ant-input[disabled] {
    color:black;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    border:1px solid ${THEME.primary_color} !important;
  }
`
export const CustomInputPassword = ({
  label,
  type,
  name,
  rules,
  step,
  onChange,
  placeholder,
  display,
  required,
  autoFocus,
  disabled,
  readOnly,
  width,
  height,
  marginRight,
  labelStyle,
  defaultValue,
  minWidth,
  value,
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
      <AntdInputStyle
        {...rest}
        defaultValue={defaultValue}
        type={type}
        autoFocus={autoFocus}
        readOnly={readOnly}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        height={height}
        step={step}
      />
    </StyledItem>
  )
}
