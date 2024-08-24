import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeResignationContainer } from './Partials/EmployeeResignationContainer'


export const EmployeeResignation = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Resignation'} />
    <EmployeeResignationContainer/>
  </Fragment>
  )
}
