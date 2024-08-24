import { DatePicker as AntdDatePicker, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'
import { Fragment } from 'react';


const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
  }
  border-radius: 10px;
  margin-bottom: -5px !important;

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-picker   {
    border: 1px solid ${THEME.primary_color} !important;
    border-radius: 10px;
  } 

  & .ant-form-item-label > label > span {
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const AntdDatePickerStyle = styled(AntdDatePicker)`
    width:100%;
    height:40px;
`
export const CustomDatePicker = ({
    initialValue,
    label,
    type,
    name,
    rules,
    onChange,
    placeholder,
    required,
    disabled,
    width,
    minWidth,
    height,
    value,
    showSearch,
    marginRight,
    labelStyle,
    defaultValue,
    optional,
    format,
    picker,
    noStyle = undefined,
    ...rest
}) => {

    const handleChange = (date, dateString) => {
        console.log(date,dateString,'llll')
        // onChange(dayjs(dateString).format('YYYY-MM-DD'));
        onChange(dateString);
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
            <AntdDatePickerStyle picker={picker} onChange={handleChange} />
        </StyledItem>
    )
}


// ====== Date Format Start   ==========
// const parsedDate = new Date(updateRecordData?.purchase_date);
// const dateFormat = 'YYYY/MM/DD';
// const date = dayjs(parsedDate).format('YYYY/MM/DD')

// form.setFieldsValue({ purchase_date: dayjs(date,dateFormat)})

// ====== Date Format End   ==========


// If you want Initial Value on Date Picker import following code

// import dayjs from 'dayjs';



// ======  Selected Date ========
//   const [selectedDate, setSelectedDate] = useState(null);

// const handleOnChange = (date) => {
//     setSelectedDate(date);
// };

// initialValues={
//     {
//       selected_date:dayjs()
//     }
//   }

// <Col span={24}>
// <CustomDatePicker
//   label={'Selected Date'}
//   name={'selected_date'}
//   onChange={handleOnChange}
//   rules={[
//     {
//       required: true,
//       message: 'Please select Date!',
//     }
//   ]} />
//   <h1>{selectedDate}</h1>
// </Col>



// ==================  Update Date =======

// useEffect(() => {
//     form.setFieldsValue(handlerecords);

//     const personDate = new Date(handlerecords?.person_dob);
//     const partnerDate = new Date(handlerecords?.partner_dob);
//     const dateFormat = 'YYYY/MM/DD';

//     const personFormattedDate = dayjs(personDate).format(dateFormat);
//     const partnerFormattedDate = dayjs(partnerDate).format(dateFormat);

//     form.setFieldsValue({ person_dob: dayjs(personFormattedDate, dateFormat), partner_dob: dayjs(partnerFormattedDate, dateFormat) });
// }, [handlerecords]);