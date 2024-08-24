import React, { Fragment } from 'react'
import { ExpenseRep } from './Partials/ExpenseReportForm'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'




export const ExpenseReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Expense Report'} />
    <ExpenseRep/>
  </Fragment>
  )
}
