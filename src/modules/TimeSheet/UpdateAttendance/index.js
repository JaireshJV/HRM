import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { UpdateAttendanceContainer } from './Partials/UpdateAttendanceContainer'

export const UpdateAttendance = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Update Attendance Table'} />
    <UpdateAttendanceContainer/>
  </Fragment>
  )
}
