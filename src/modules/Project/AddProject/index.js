import React, { Fragment } from 'react'
import { AddProjectContainer } from './Partials/AddProjectContainer'
import { CustomPageTitle } from '../../../components/CustomPageTitle'

export const AddProject = () => {
  
  return (
    <Fragment>
      <CustomPageTitle Heading={'Add Project'} />
      <AddProjectContainer/>
    </Fragment>
  )
}
