import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeTerminationsContainer } from './Partials/EmployeeTerminationsContainer'


export const EmployeeTerminations = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Terminations'} />
    <EmployeeTerminationsContainer/>
  </Fragment>
  )
}
