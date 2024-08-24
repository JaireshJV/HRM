import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../components/CustomPageTitle'
import { AssestsContainer } from './AddAssests/Partials/AssestsContainer'


export const AssestsIndex = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Assests'} />
      <AssestsContainer />
    </Fragment>
  )
}
