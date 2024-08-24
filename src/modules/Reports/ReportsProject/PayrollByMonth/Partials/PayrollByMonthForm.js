import React, { Fragment, useState, useEffect } from 'react';
import { Col, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../../../../components/Form/CustomButton';
import Flex from '../../../../../components/Flex';
import { CustomRow } from '../../../../../components/CustomRow';
import request from '../../../../../utils/request';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle';
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker';
import moment from 'moment';
import {PayrollByMonthTable} from './PayrollByMonthTable';
import { getPayroll, selectAllPayroll } from '../../../../../Store/CustomSlice/PayrollSlice';


export const PayrollByMonthForm = () => {

    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();

    const [selectedMonth, setselectedMonth] = useState(null);
    const payroll = useSelector(selectAllPayroll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPayroll());
    }, [dispatch]);

    useEffect(() => {
        setDataSource(payroll);
    }, [payroll]);
    
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
        request.post('totalsalary/month/year', values)
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
        dispatch(getPayroll());
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
                            <CustomDatePicker picker={'month'} name={'month&year'} onChange={selectDateChange} />

                        </Col>

                    </CustomRow>
                    <Flex center gap={'20px'} W_100 style={{ marginTop: '30px' }}>
                        <Button.Primary text={'Search'} htmlType={'submit'} />
                        <Button.Danger text={'Reset'} onClick={onReset} />
                    </Flex>
                </Form>
            </CustomCardView>
            <PayrollByMonthTable dataSource={dataSource} />
        </Fragment>
    );
};
