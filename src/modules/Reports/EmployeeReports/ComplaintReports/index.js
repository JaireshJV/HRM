import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ComplaintsReportForm } from './Partials/ComplaintsReportForm'


export const ComplaintsReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Complaint Report'} />
    <ComplaintsReportForm/>
  </Fragment>
  )
}
