import React, { Fragment } from 'react'
import { ExampleContainer } from './Partials/ExampleContainer'
import { CustomPageTitle } from '../../components/CustomPageTitle'

export const Example = () => {
  
  return (
    <Fragment>
      <CustomPageTitle Heading={'Company'} />
      <ExampleContainer />
    </Fragment>
  )
}
