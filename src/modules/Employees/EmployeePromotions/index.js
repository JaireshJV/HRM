import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeePromotionsContainer } from './Partials/EmployeePromotionsContainer'


export const EmployeePromotions = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Promotions'} />
    <EmployeePromotionsContainer/>
  </Fragment>
  )
}
