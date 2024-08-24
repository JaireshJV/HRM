// import { Select, Button } from 'antd';
import { Fragment, useState } from 'react';
import { Select as AntdSelect, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'
import Button from './CustomButton';
import { PlusCircleOutlined } from '@ant-design/icons'

const { Item } = Form
const { Option } = AntdSelect;

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  border-radius: 8px;
  margin-bottom: -5px !important;
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
const AntdSelectStyle = styled(AntdSelect)`

    margin-bottom:5px;
    font-family:  'Poppins', sans-serif;
    font-weight:600;
    height: ${props => (props.height ? props.height : '40px')};
    border-radius: 8px;
    box-shadow: none;
    border-color: ${props => (props.error ? 'red' : '#8056F7')};

    ::placeholder {
    font-size: 16px;
    }

    :focus {
    border-color: ${THEME.primary_color};
    box-shadow: none;
    }

    :hover {
    border-color: ${THEME.primary_color};
    }

    & .ant-select-selector {
        height:100% !important;
        border: 1px solid ${THEME.primary_color} !important;
        
        & input{
        height:100% !important;
    }
  }

  &.ant-input[disabled] {
    color: ${THEME.black};
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }

  & .ant-select-selection-item{
    margin:auto;
    font-size: 1rem;
    font-weight: 600;
  }

  & .ant-select-selection-placeholder { 
    margin:auto;
  }
`
export const CustomAddSelect = ({
    initialValue,
    label,
    type,
    name,
    buttonLabel,
    onButtonClick,
    rules,
    onChange,
    placeholder,
    required,
    disabled,
    options,
    width,
    minWidth,
    height,
    onSearch,
    searchText,
    notFoundContent,
    value,
    showSearch,
    marginRight,
    labelStyle,
    defaultValue,
    optional,
    noStyle = undefined,
    ...rest
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleButtonClick = () => {
        setIsDropdownOpen(false);
        onButtonClick();
    };

    return (
        <StyledItem
            style={{
                width: width,
                marginRight: marginRight,
                minWidth: minWidth
            }}
            rules={rules}
            noStyle={noStyle}
            name={name}
            colon={false}
            required={false}
            initialValue={initialValue}
            label={
                label && (
                    <Fragment>
                        <Label required={required} labelStyle={labelStyle}>
                            {label} <span>{optional}</span>
                        </Label>
                    </Fragment>
                )
            }
            {...rest}>
            <AntdSelectStyle
                placeholder={placeholder}
                showSearch={true}
                value={searchText}
                onChange={onChange}
                // onSearch={true}
                defaultValue={defaultValue}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={(menu) => (
                    <div>
                        <div style={{ padding: '8px 12px' }}>
                            <Button style={{ border: `1px solid ${THEME.PRIMARY}`, width: '100%', color: `${THEME.PRIMARY}`, }} onClick={handleButtonClick}>
                                <PlusCircleOutlined /> {buttonLabel}
                            </Button>
                        </div>
                        {menu}
                    </div>
                )}
                open={isDropdownOpen}
                onDropdownVisibleChange={(open) => setIsDropdownOpen(open)} >
                {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </AntdSelectStyle>
        </StyledItem>
    )
}




// ====================  Usage =================

// const [productdata, setProductdata] = useState(                        // {setProduct}
//     {
//         mySelectField: '',
//         myArraryField: [],
//     },
// );

// const handleButtonClick = () => {
//     setModalTitle("Add Category");
//     setModalContent(<ProductModal handleOk={handleOk} setCategory={setCategory} HandlesetCatLoad={HandlesetCatLoad} />);
//     showModal();
// };

// const categoryOption = catOptions?.map((category) => ({
//     label: category.category,
//     value: category.category_id,
// }));

// <CustomSelect label={'Product Category'} name={'categoryid'}
//     showSearch={true}
//     onButtonClick={handleButtonClick}
//     onChange={(e) => categoryId(e)}
//     options={categoryOption}
//     value={productdata} rules={[
//         {
//             required: true,
//             message: 'Please enter details!',
//         },
//     ]} />


// ======= Set Customer searched text ======


// const [searchText, setSearchText] = useState('');
// const [selectedValue, setSelectedValue] = useState('');

// // ------------------  Customer Search   --------------------

// useEffect(() => {
//     if (searchText) {
//         setSelectedValue(searchText);
//         form.setFieldsValue({ sale_customer: searchText });
//     }
// }, [searchText]);

// // ---------------------  Customer Search -------------
// const handleSearchValue = (value) => {
//     setSearchText(value);
// }

// <CustomSelect rules={[
//     {
//         required: true,
//         message: 'This is a required field'
//     },
// ]}
//     buttonLabel="Add Item"
//     onButtonClick={handleItemModalShow}
//     minWidth={'200px'}
//     name={`item${record.key}`}
//     options={OutSourceData.itemsData}
//     showSearch
//     onSearch={(value) => handleItemSearchChange(value, record)}
// onSearch={handleItemSearchChange}
// />