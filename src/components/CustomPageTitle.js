import React from 'react'
import styled from 'styled-components'
import { THEME } from '../theme';
import { CustomDivider } from './CustomDivider';

const Titles = styled.div`
    & h2 {
        font-size: 32px;
        color: ${THEME.primary_color};
        font-weight: 800;
        font-variant: small-caps;
        text-transform: capitalize;
        margin-bottom:10px;
        text-align:center;
    }
`;


const FormTitles = styled.div`
    & h2 {
        font-size: 18px;
        color: ${THEME.primary_color};
        font-weight: 600;
        text-transform: capitalize;
        margin-bottom:10px;
    }
`;

const FormSubTitles = styled.div`
    & h4 {
        font-size: 16px;
        color: ${THEME.black};
        font-weight: 600;
        text-transform: capitalize;
        margin:10px;
    }
`;

export const CustomPageTitle = ({ Heading }) => {
    return (
        <Titles>
            <h2>{Heading} . . .</h2>
        </Titles>
    )
}

export const CustomPageFormTitle = ({ Heading }) => {
    return (
        <FormTitles>
            <h2>{Heading}</h2>
        </FormTitles>
    )
}

export const CustomPageFormSubTitle = ({ Heading }) => {
    return (
        <FormSubTitles>
            <h4>{Heading}</h4>
            <CustomDivider/>
        </FormSubTitles>
    )
}