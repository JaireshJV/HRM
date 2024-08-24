import React, { Fragment } from 'react'
import { AnnouncementContainer } from './Partials/AnnouncementContainer'
import { CustomPageTitle } from '../../../components/CustomPageTitle'

export const AnnouncementTableIndex = () => {

    return (
        <Fragment>
            <CustomPageTitle Heading={'Company Announcement'} />
            <AnnouncementContainer />
        </Fragment>
    )
}
