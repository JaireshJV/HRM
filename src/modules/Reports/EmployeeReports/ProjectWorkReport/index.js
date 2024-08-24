import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { ProjectWorkReportForm } from './Partials/ProjectWorkReportForm'


export const ProjectWorkReport = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Employee Project Work Report'} />
            <ProjectWorkReportForm />
        </Fragment>
    )
}
