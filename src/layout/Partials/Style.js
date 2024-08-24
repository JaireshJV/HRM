import { Input, } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme';

export const MainLayout = styled.section`
    min-height:100vh;
    display:flex;
    width:100%;
    transition:0.5s;
`;

export const SideBar = styled.aside`

    z-index: 10;
    position: relative;
    top: 95px;
    height: calc(100vh - 110px);
    overflow-y: auto;
    width: 250px;
    background: ${THEME.secondary_color};
    transition: all 0.5s ease 0s;
    border-radius:10px;
    margin:5px;

    &.active{
        width:0px;
        transition:0.5s;
        margin:0;
    }

    & ul.ant-menu.ant-menu-root {
        margin: 18px 0;
    }

    .ant-menu-item.ant-menu-item-only-child{
        padding-left:20px !important;
    }

    .ant-menu-submenu-title{
        padding-left:20px !important;
       
    }

    .ant-menu-submenu-title:hover{
        background:  ${THEME.primary_color} !important;
        color: ${THEME.white} !important;
    }

    .ant-menu-item:not(.ant-menu-item-selected):hover {
        color: ${THEME.white} !important;
        background:  ${THEME.primary_color} !important;
    }

    .ant-menu-item-selected {
        color: ${THEME.white} !important;
        background:  ${THEME.primary_color} !important;
    }

    .ant-menu-submenu-title:active {
        background-color: #fff0 !important;
        color:${THEME.white};
    }

    .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
        padding: 0 0 0 32px !important;
        border: 0;
        color: #fff !important;
        border-radius: 0;
        box-shadow: none;
    }

    .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title {
        color: ${THEME.white} !important;
    }

    .ant-menu {
        color: ${THEME.white};
        background: ${THEME.secondary_color};
        border-radius: 15px;
    }

    @media (max-width:900px) {
        position:fixed;
    }
`;


export const ContentLayout = styled.section`
    transition:0.5s;
    height:inherit;
    height:100vh;
    overflow:hidden;
    /* background:red; */
    width:calc(100% - 250px);

    &.active{
        width:100%;
        transition:0.5s;
    }

    @media (max-width:900px) {
        width:100%;
    }
`;

export const ContentHeader = styled.div`
    z-index:20;
    position:fixed;
    padding:10px 20px;
    background:${THEME.primary_color};
    top:0;
    left:0;
    right:0;
    transition:0.5s;

    .ant-tooltip-inner {
        background-color: red !important;
    }
`;

export const MainContent = styled.section`
    padding: 0 10px;
    margin:100px 10px 10px 10px;
    height:calc(100vh - 110px);
    overflow-x:hidden;
    overflow-y:auto;
`;

export const SearchInput = styled(Input)`
    &.ant-input-affix-wrapper{
        border:none ;
        box-shadow:none;
    }

    & .ant-input-prefix{
        margin-inline-end:10px;
    }
`;

export const HeaderIconHolder = styled.div`
    display: flex;
    gap: 20px;
    padding: 10px;
    align-items:center;
    & .header__icon{
    font-size: 28px;
    cursor: pointer;
    }
`

export const BtnSideHolder = styled.div`
    margin: 0 10px;
    background: ${THEME.secondary_color};
    width: 36px;
    height: 36px;
    display: flex;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
/*  display:none;*/
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition:0.5s;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    & svg{
        font-size:1.2rem;
    }

    /* @media (max-width:1100px) {
        display:flex
    } */
 
 & .header__icon{
    font-size: 22px;
    color:${THEME.white};
    }
`

export const Logo = styled.div`
        width:max-content;
        
        @media ${THEME.MOBILEL} {
            width:250px;
        }

    & span{
        text-transform:uppercase;
        font-weight:700;
        font-size:18px;
        color:${THEME.white};

        @media ${THEME.MOBILEL} {
            font-size:22px;
        }
    }
`
