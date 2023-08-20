import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllLocation = createAsyncThunk('getAll', async ({
                                                                      pageNumber = 1,
                                                                      perPage = 100,
                                                                      sortField = '',
                                                                      sortDir = '',
                                                                      keyword = ''
                                                                  }) => {
    try {
        return await instance.get(`locations?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetLocationById = createAsyncThunk('getById', async ({id}) => {
    try {
        return await instance.get(`locations/${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveLocation = createAsyncThunk('remove', async ({id}) => {
    try {
        return await instance.delete(`locations?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchSaveLocation = createAsyncThunk('save', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`locations`, data)
        if (response && response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/locations")
        }
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetListLocationByParentId = createAsyncThunk('get-list', async ({parentId, keyword}) => {
    try {
        return await instance.get(`locations/get-list-location-by-parent-id?parentId=${parentId}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const locationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLocation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllLocation.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllLocation.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveLocation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveLocation.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveLocation.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveLocation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveLocation.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveLocation.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectLocation = state => state.location.list

export default locationSlice.reducer