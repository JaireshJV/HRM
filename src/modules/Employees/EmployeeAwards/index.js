import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeAwardsContainer } from './Partials/EmployeeAwardsContainer'


export const EmployeeAwards = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Awards'} />
    <EmployeeAwardsContainer/>
  </Fragment>
  )
}
