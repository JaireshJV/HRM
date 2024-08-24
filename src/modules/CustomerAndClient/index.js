import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../components/CustomPageTitle'
import { CustomerAndClientContainer } from './Partials/CustomerAndClientContainer'

export const CustomerAndClient = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Customer And Client'} />
      <CustomerAndClientContainer />
    </Fragment>
  )
}
