import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmployeeQualificationContainer } from './Partials/EmployeeQualificationContainer'


export const EmployeeQualificationAndCertificates = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Add Employee Qualification And Certificates'} />
    <EmployeeQualificationContainer/>
  </Fragment>
  )
}
