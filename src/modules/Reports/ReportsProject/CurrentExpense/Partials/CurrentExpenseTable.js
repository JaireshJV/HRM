import { Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomTable } from '../../../../../components/CustomTable'
import { toast } from 'react-toastify'
import request from '../../../../../utils/request'
import { CustomCardView } from '../../../../../components/CustomCardView'
import Label from '../../../../../components/Form/Label'
import { CustomInput } from '../../../../../components/Form/CustomInput'
import Flex from '../../../../../components/Flex'

export const CurrentExpenseTable = () => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    // ----- Define Form
    const [form] = Form.useForm();

    const [totalAmount, settotalAmount] = useState(0)

    useEffect(() => {
        MonthReports()
    }, [])
    
    const MonthReports = () => {
        request
            .get('currentdateexpense')
            .then(function (response) {
                toast.success(response.data);
                setDataSource(response.data);
                form.resetFields();

                const total = response.data?.reduce((acc, expenseItem) => acc + parseInt(expenseItem.amount), 0);
                settotalAmount(total)
            })
            .catch(error => { });
    };

    useEffect(() => {
        
        form.setFieldsValue({ totalAmt: totalAmount })
    }, [dataSource,form])
    
    // form.setFieldsValue({totalAmt: 999})

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
    }

    const onFinishFailed = (errorInfo) => {
    };
    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Expense Date',
            dataIndex: 'date',
        },
        {
            title: 'Expense Name',
            dataIndex: 'expense_name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },

    ]

    return (
        <Fragment>

            <CustomCardView>
                <Form
                    form={form}
                    name="attendance"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    // initialValues={{
                    //     total: ,
                    // }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <CustomTable data={dataSource} columns={columns} />
                    <Flex spcPading flexEnd baseLine>
                        <Label>Total :&nbsp;&nbsp;</Label>
                        <CustomInput name={'totalAmt'} disabled={'true'} value={totalAmount}/>
                    </Flex>

                </Form>
            </CustomCardView>
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} />
        </Fragment>
    )
}
