import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { TraineeClassContainer } from './Partials/TraineeClassContainer'

export const TraineeClass = () => {
  
  return (
    <Fragment>
      <CustomPageTitle Heading={'Trainee Class'} />
      <TraineeClassContainer/>
    </Fragment>
  )
}
