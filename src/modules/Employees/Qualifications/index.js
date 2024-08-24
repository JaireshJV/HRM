import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { QualificationContainer } from './Partials/QualificationsContainer'


export const QualificationAndCertificates = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Add Employee Qualification And Certificates'} />
    <QualificationContainer/>
  </Fragment>
  )
}
