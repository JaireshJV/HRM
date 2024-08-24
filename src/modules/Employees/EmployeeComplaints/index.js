import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeComplaintsContainer } from './Partials/EmployeeComplaintsContainer'


export const EmployeeComplaints = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Complaints'} />
    <EmployeeComplaintsContainer />
  </Fragment>
  )
}
