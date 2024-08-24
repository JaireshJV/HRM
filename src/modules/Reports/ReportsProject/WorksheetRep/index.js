import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { WorksheetForm } from './Partials/WorksheetForm'



export const WorkSheetReport = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'WorkSheet Report'} />
   <WorksheetForm/>
  </Fragment>
  )
}
