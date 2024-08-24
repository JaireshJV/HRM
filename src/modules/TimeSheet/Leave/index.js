import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { LeaveForm } from './Partials/LeaveForm'


export const ViewAttendance = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'View Attendance'} />
    <LeaveForm/>
  </Fragment>
  )
}
