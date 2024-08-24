import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { PayrollContainer } from './Partials/PayrollContainer'


export const Payroll = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Payroll For Employees'} />
    <PayrollContainer />
  </Fragment>
  )
}
