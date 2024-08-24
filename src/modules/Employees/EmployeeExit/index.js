import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeExitContainer } from './Partials/EmployeeExitContainer'

export const EmployeeExit = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Exit'} />
    <EmployeeExitContainer/>
  </Fragment>
  )
}
