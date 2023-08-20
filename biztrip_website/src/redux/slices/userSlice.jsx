import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllUser = createAsyncThunk('user/getAllUSer', async ({
                                                                           pageNumber = 1,
                                                                           perPage = 100,
                                                                           sortField = '',
                                                                           sortDir = '',
                                                                           keyword = ''
                                                                       }) => {
    try {
        return await instance.get(`users?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetUserById = createAsyncThunk('user/getUserById', async ({id}) => {
    try {
        return await instance.get(`users/${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveUser = createAsyncThunk('user/removeUser', async ({id}) => {
    try {
        return await instance.delete(`users?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchChangePassword = createAsyncThunk('user/change-password', async ({data}) => {
    try {
        return await instance.put(`users/change-password`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchPutUserUpdateInfo = createAsyncThunk('putUserUpdate', async ({data}) => {
    try {
        return await instance.put(`users/update-info`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchForgetPassword = createAsyncThunk('user/forgetPassword', async ({email}) => {
    try {
        return await instance.get(`users/forget-password?email=${email}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchResetPassword = createAsyncThunk('user/resetPassword', async ({data}) => {
    try {
        return await instance.post(`users/reset-password`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetUserByEmail = createAsyncThunk('user/getByEmail', async ({email}) => {
    try {
        return await instance.get(`users/get-user-by-email?email=${email}`)
    } catch (err) {
        console.error(err)
    }
})

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllUser.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchPutUserUpdateInfo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPutUserUpdateInfo.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchPutUserUpdateInfo.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveUser.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveUser.rejected, (state, action) => {
                state.status = 'failed'
            })

    }
})

export const selectUser = state => state.user.list

export default userSlice.reducer