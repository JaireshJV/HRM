import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import {PayrollByMonthForm} from './Partials/PayrollByMonthForm'




export const PayrollMonth = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Payroll Report By Month'} />
    <PayrollByMonthForm/>
  </Fragment>
  )
}
