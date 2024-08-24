import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ExpenseByYearTable } from './Partials/ExpenseByYearTable'




export const ExpenseByYear = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Yearly Expense Table'} />
    <ExpenseByYearTable/>
  </Fragment>
  )
}
