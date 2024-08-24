import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex'
import SignInForm from './SignInForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import initializeApp from '../../utils/initializeApp'
import request from '../../utils/request'
import { toast } from 'react-toastify'
import img from '../../assets/Images/img.avif'
import { selectCurrentUser, setCredentials } from '../Auth/authSlice'


export const Wrapper = styled(Flex)`
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${img});

`
const SignInCard = styled.div`
  background-color:rgba(255,255,255,0.05);
  backdrop-filter:blur(10px);
  padding: 40px 32px;
  border-radius:0px 40px 0px 40px;
  max-width: 450px;
  width: 100%;
  margin: auto;
  /* height: 70%; */
  border: 3px solid grey;
`

const UserSignin = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleSignIn = async (data) => {
    try {
      const authData = await request.post(`admin/login`, {
        ...data,
      })

      // Mock API, add the origin API and payload data
      if (authData?.data !== '') {
        initializeApp(authData?.data?.token) // pass the token to this function
        toast.success(`Login Successful, Welcome`)
        dispatch(setCredentials(authData?.data))
        navigate('/')
      }
      else {
        toast.error('UserName or Password is incorrect ')
      }

    } catch (error) {
      toast.error('Getting error while login, Please Login Again')
    }
  }


  const token = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token) {
      // if()
      navigate('/signin')
    }
  }, [navigate,token])

  return (
    <Wrapper column>
      <SignInCard>
        <SignInForm handleSignIn={handleSignIn} />
      </SignInCard>
    </Wrapper>
  )
}
export default UserSignin
