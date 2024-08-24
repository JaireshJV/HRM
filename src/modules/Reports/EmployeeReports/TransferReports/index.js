import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { TransferReportForm } from './Partials/TransferReportsForm'


export const TransferReport = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Transfer Reports'} />
            <TransferReportForm />
        </Fragment>
    )
}
