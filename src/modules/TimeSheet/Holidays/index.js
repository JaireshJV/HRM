import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { HolidaysContainer } from './Partials/HolidaysContainer'

export const Holidays = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Holidays'} />
    <HolidaysContainer/>
  </Fragment>
  )
}
