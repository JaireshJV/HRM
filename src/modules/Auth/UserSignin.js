import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCredentials } from './authSlice'
import initializeApp from '../../utils/initializeApp'
import request from '../../utils/request'
import { toast } from 'react-toastify'
import SignInForm from './Partials/SignInForm'
import HRMbgImage from '../../assets/Images/Login/L3.jpg'

export const Wrapper = styled(Flex)`
  height: 100vh;
  width: 100%;
  background-image:url(${HRMbgImage});
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
  display: flex;
    align-items: baseline;
    justify-content: center;

@media screen and (max-width: 650px) {
    align-items: center;
  }
`

const SignInCard = styled.div`
  background-color:rgba(255,255,255,0.25);
  backdrop-filter:blur(15px);
  padding: 40px 20px;
  border-radius:20px;
  max-width: 450px;
  width: 100%;
  margin-left: 100px;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  border-right: 1px solid rgba(255,255,255,0.5);
  /* box-shadow:0 25px 50px rgba(0,0,0,0.1) */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media screen and (max-width: 650px) {
  margin-left: 0;
  }
`

const UserSignin = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleSignIn = async (data) => {
        try {
            const authData = await request.post(`login`, {
                ...data,
            })
            // Mock API, add the origin API and payload data
            if (authData?.data?.token !== '') {
                initializeApp(authData?.data?.token) // pass the token to this function
                toast.success(`Login Successful, Welcome ${authData?.data?.username}`)
                dispatch(setCredentials(authData?.data))
                navigate('/')
            }
            else {
                toast.error('UserName or Password is incorrect ')
            }

        } catch (error) {
            toast.error('Getting error while login, Please Login Again')

            console.error('Getting error while login', error)
        }
    }


    const token = useSelector(selectCurrentUser);

    useEffect(() => {
        if (token) {
            // if()
            navigate('/signin')
        }
    }, [token])

    return (
        <Wrapper column>
            <SignInCard>
                <SignInForm handleSignIn={handleSignIn} />
            </SignInCard>
        </Wrapper>
    )
}
export default UserSignin
