import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import initializeApp from "../../utils/initializeApp";

const initialState = {
    token: null,
    loading: false,
    authUser: null
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data) => {
        console.log('Called', data)
        const response = await request.post('login', { ...data });
        console.log(response, 'llllllll')
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.authUser = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { username, token, login_status } = action.payload
                state.authUser = username
                state.token = token
                state.loading = false
                initializeApp(action.payload)
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('error')
            })
    }
})

export const { logOut } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.authUser
export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer