import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { MonthlyAbsentTable } from './Partials/MonthlyAbsent'




export const MonthlyAbsent = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Monthly Absent Reports'} />
    <MonthlyAbsentTable/>
  </Fragment>
  )
}
