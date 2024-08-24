import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { PayrollReport } from './Partials/PayrollReport'




export const PayrollRep = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Payroll Report'} />
    <PayrollReport/>
  </Fragment>
  )
}
