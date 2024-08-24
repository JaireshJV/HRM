import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ProjectReports } from './Partials/ProjectReportForm'





export const ProjectRep = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Project Report'} />
    <ProjectReports/>
  </Fragment>
  )
}
