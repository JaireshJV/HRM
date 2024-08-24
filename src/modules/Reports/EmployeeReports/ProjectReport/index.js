import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ProjectReportFormEmp } from './Partials/ProjectReportForm'


export const ProjectReportEmp = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Employee Project Report'} />
    <ProjectReportFormEmp/>
  </Fragment>
  )
}
