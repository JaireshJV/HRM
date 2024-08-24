import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { TaskContainer } from './Partials/TasksContainer'

export const WorksheetTasks = () => {
  
  return (
    <Fragment>
      <CustomPageTitle Heading={'Tasks'} />
      <TaskContainer />
    </Fragment>
  )
}
