import React, { Fragment } from 'react'
import { AddEmployeeContainer } from './Partials/AddEmployeeContainer'
import { CustomPageTitle } from '../../../components/CustomPageTitle'


export const AddEmployee = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employees'} />
    <AddEmployeeContainer/>
  </Fragment>
  )
}
