import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ResignationReportForm } from './Partials/ResignationReportForm'


export const ResignationReport = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Resignation Reports'} />
            <ResignationReportForm />
        </Fragment>
    )
}
