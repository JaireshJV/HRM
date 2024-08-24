import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeTransferContainer } from './Partials/EmployeeTransferContainer'


export const EmployeeTransfer = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Transfer'} />
    <EmployeeTransferContainer/>
  </Fragment>
  )
}
