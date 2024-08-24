import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import {CurrentExpenseTable} from './Partials/CurrentExpenseTable'





export const CurrentExpense = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Current Expense Table'} />
    <CurrentExpenseTable/>
  </Fragment>
  )
}
