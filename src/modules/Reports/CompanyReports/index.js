import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { CompanyReports } from './Partials/CompanyReports'



export const CompanyReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Company Report'} />
    <CompanyReports/>
  </Fragment>
  )
}
