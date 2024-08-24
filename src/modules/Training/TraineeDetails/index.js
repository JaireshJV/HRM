import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { TraineeDetailsContainer } from './Partials/TraineeDetailsContainer'


export const TraineeDetails = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Trainee Details'} />
    <TraineeDetailsContainer/>
  </Fragment>
  )
}
