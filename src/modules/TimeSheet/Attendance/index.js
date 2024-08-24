import React, { Fragment } from 'react'
import { AttendanceContainer } from './Partials/AttendanceContainer'
import { CustomPageTitle } from '../../../components/CustomPageTitle'

export const AttendanceIndex = () => {

    return (

        <Fragment>
            <CustomPageTitle Heading={'Attendance'} />
            <AttendanceContainer />
        </Fragment>
    )
}
