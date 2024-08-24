import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { AwardsReportForm } from './Partials/AwardsReportsForm'

export const AwardsReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Awards Report'} />
    <AwardsReportForm/>
  </Fragment>
  )
}
