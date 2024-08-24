import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle';
import { AttendanceTable } from './AttendanceTable';



export const AttendanceContainer = () => {

    return (

        <CustomCardView>
            <CustomPageFormTitle Heading={'View Attendance'} />

            <AttendanceTable />

        </CustomCardView>
    )
}
