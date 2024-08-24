import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { ProjectWorkContainer } from './Partials/ProjectWorkContainer'


export const ProjectWork = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Project Work'} />
    <ProjectWorkContainer />
  </Fragment>
  )
}
