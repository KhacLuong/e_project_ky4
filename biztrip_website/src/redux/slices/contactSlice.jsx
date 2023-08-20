import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllContact = createAsyncThunk('getAll', async ({
                                                                     pageNumber = 1,
                                                                     perPage = 100,
                                                                     sortField = '',
                                                                     sortDir = '',
                                                                     keyword = ''
                                                                 }) => {
    try {
        return await instance.get(`contacts?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchCreateContact = createAsyncThunk('contact/create', async ({data}) => {
    try {
        return  await instance.post(`contacts`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchUpdateContact = createAsyncThunk('update', async () => {
    try {
        return  await instance.put(`contacts`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveContact = createAsyncThunk('remove', async ({id}) => {
    try {
        return await instance.delete(`contacts?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const contactSlice = createSlice({
    name: 'Contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllContact.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllContact.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllContact.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveContact.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveContact.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveContact.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchCreateContact.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCreateContact.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchCreateContact.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchUpdateContact.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdateContact.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchUpdateContact.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectContact = state => state.contact.list
export default contactSlice.reducer