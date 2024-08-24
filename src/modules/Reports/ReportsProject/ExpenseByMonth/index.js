import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ExpenseByMonthForm } from './Partials/ExpenseByMonthForm'



export const ExpenseByMonthReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Expense Report By Month'} />
    <ExpenseByMonthForm/>
  </Fragment>
  )
}
