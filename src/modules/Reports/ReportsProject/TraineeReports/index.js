import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import {TraineeReportsForm} from './Partials/TraineeReportsForm'





export const TraineeReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Trainee Report'} />
   <TraineeReportsForm/>
  </Fragment>
  )
}
