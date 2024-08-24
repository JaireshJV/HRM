import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CurrentlyAbsentTable } from './Partials/CurrentlyAbsentTable'




export const CurrentAbsent = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Currently Absent Reports'} />
    <CurrentlyAbsentTable/>
  </Fragment>
  )
}
