import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageFormTitle } from '../../../../components/CustomPageTitle'
import { UpdateAttendanceTable } from './UpdateAttendanceTable'

export const UpdateAttendanceContainer = () => {

    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'Attendance Update'} />
            
            <UpdateAttendanceTable />

        </CustomCardView>


    )
}
