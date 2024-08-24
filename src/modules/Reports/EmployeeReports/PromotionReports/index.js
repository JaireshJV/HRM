import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { PromotionReportForm } from './Partials/PromotionReportsForm'


export const PromotionReport = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Promotion Reports'} />
            <PromotionReportForm />
        </Fragment>
    )
}
