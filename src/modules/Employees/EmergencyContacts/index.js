import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { EmergencyContactsContainer } from './Partials/EmergencyContactsContainer'

export const EmergencyContacts = () => {
  return (
    <Fragment>
    <CustomPageTitle Heading={'Emergency Contacts'} />
    <EmergencyContactsContainer/>
  </Fragment>
  )
}
