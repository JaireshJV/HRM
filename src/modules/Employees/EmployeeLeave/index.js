import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeLeaveContainer } from './Partials/EmployeeLeaveContainer'

export const EmployeeLeave = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Leave'} />
    <EmployeeLeaveContainer/>
  </Fragment>
  )
}
