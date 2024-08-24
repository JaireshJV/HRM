import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import { CompanyProfileContainer } from './Partials/CompanyProfileContainer'

export const CompanyProfile = () => {

    return (
        <Fragment>
            <CustomPageTitle Heading={'Company Profile'} />
            < CompanyProfileContainer />
        </Fragment>
    )
}
