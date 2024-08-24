import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { ExpenseTableContainer } from './Partials/ExpenseTableContainer'

export const ExpenseTableIndex = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Company Expense'} />
    <ExpenseTableContainer/>
  </Fragment>
  )
}
