import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import {ViewPayrollForm} from './Partials/ViewPayrollForm'



export const ViewPayroll = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'View Payroll'} />
            <ViewPayrollForm />
        </Fragment>
    )
}
