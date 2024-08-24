import { Form } from 'antd'
import { Fragment, useEffect } from 'react'
import { CustomTable } from '../../../../../components/CustomTable'
import { CustomInput } from '../../../../../components/Form/CustomInput'
import Label from '../../../../../components/Form/Label'
import Flex from '../../../../../components/Flex'
import { CustomCardView } from '../../../../../components/CustomCardView'

export const ExpenseByMonthTable = ({ dataSource }) => {
    // ----- Define Form
    const [form] = Form.useForm();
    const total = dataSource?.reduce((acc, expenseItem) => acc + parseInt(expenseItem.amount), 0);

    useEffect(() => {
        form.setFieldsValue({ total: total })
    }, [total,form])



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
            title: 'Expense Type',
            dataIndex: 'expense_type',
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
        
                    autoComplete="off">
                    <CustomTable data={dataSource} columns={columns} />
                    <Flex spcPading flexEnd baseLine>
                        <Label>Total :&nbsp;&nbsp;</Label>
                        <CustomInput name={'total'} disabled={'true'} />
                    </Flex>

                </Form>
            </CustomCardView>

        </Fragment>
    )
}
