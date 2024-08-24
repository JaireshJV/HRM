import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    authUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, token } = action.payload
            state.authUser = username
            state.token = token
        },
        logOut: (state, action) => {
            state.authUser = null
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.authUser
export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer