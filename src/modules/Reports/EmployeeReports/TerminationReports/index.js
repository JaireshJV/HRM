import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { TerminationReportForm } from './Partials/TerminationReportsForm'


export const TerminationReport = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Termination Reports'} />
            <TerminationReportForm />
        </Fragment>
    )
}
