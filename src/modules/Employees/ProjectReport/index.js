import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { ProjectReportContainer } from './Partials/ProjectReportContainer'


export const ProjectReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Project Report'} />
    <ProjectReportContainer />
  </Fragment>
  )
}
