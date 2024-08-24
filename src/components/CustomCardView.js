import styled from "styled-components";

const CustomCard = styled.div`
    background:white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin:auto;
    max-width:${props => props.width || '100%'};
    padding:25px;
    border-radius:20px;
`

export const CustomCardView = ({ children, width }) => {
    
    return (
        <CustomCard width={width}>
            {children}
        </CustomCard>
    )
}