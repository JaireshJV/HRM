import React, { Fragment, useState, useEffect } from 'react';
import { Col, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getExpense, selectAllExpense } from '../../../../../Store/CustomSlice/CompanySlice';
import Button from '../../../../../components/Form/CustomButton';
import Flex from '../../../../../components/Flex';
import { CustomRow } from '../../../../../components/CustomRow';
import request from '../../../../../utils/request';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle';
import { ExpenseByMonthTable } from './ExpenseByMonthTable';
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker';
import moment from 'moment';

export const ExpenseByMonthForm = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
   
    const [selectedMonth, setselectedMonth] = useState(null);
    const expense = useSelector(selectAllExpense);

    const dispatch = useDispatch();
    // const [form] = Form.useForm(); // Initialize form here

    useEffect(() => {
        dispatch(getExpense());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(expense);
    }, [expense]);

    const selectDateChange = (dates) => {
        if (dates) {
            setselectedMonth(dates);
        }
    };
    
    const onFinish = (values) => {
        try {
    
            // Extract year and month separately
            const selectedYear = moment(selectedMonth).format('YYYY');
            const selectedMonthName = moment(selectedMonth).format('MMMM');
    
            const record = { ...values, monthname: selectedMonthName, year: selectedYear };
            const ConvertedValue = {
                year: record.year,
                monthname: record.monthname
            };
    
            CmpReport(ConvertedValue);
        } catch (error) {
        }
    };

    const CmpReport = (values) => {
        request.post('expense/month', values)
            .then(function (response) {
                toast.success(response.data);
                setDataSource(response.data);
                form.resetFields();
            })
            .catch(error => {
            });
    };

    const onFinishFailed = (errorInfo) => {
    };

    const onReset = () => {
        dispatch(getExpense());
        form.resetFields();
    };

    return (
        <Fragment>
            <CustomCardView width={'800px'}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete='off'
                >
                    <CustomRow gutter={[24, 24]}>
                        <Col md={6}></Col>
                        <Col span={24} md={12}>
                            <CustomPageFormTitle Heading={'Search Month'} />
                            {/* <DatePicker.MonthPicker
                                rules={[{ required: true, message: 'Please select date' }]}
                                onChange={selectDateChange}
                                name='range'
                                style={{ width: '100%' }}
                            /> */}

                            <CustomDatePicker picker={'month'} name={'month&year'} onChange={selectDateChange} />

                        </Col>

                    </CustomRow>
                    <Flex center gap={'20px'} W_100 style={{ marginTop: '30px' }}>
                        <Button.Primary text={'Search'} htmlType={'submit'} />
                        <Button.Danger text={'Reset'} onClick={onReset} />
                    </Flex>
                </Form>
            </CustomCardView>
            <br/>
            <ExpenseByMonthTable dataSource={dataSource} />
        </Fragment>
    );
};
