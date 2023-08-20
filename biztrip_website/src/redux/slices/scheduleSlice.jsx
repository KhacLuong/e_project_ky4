import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchGetAllLocation = createAsyncThunk('getAllLocation', async ({sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`locations/get-all-location?sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchAllSchedule = createAsyncThunk('schedule/getAllSchedule', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`schedules?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetListSchedulePopular = createAsyncThunk('schedule/getListSchedulePopular', async () => {
    try {
        return await instance.get(`schedules/getSchedulePopular`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetScheduleById = createAsyncThunk('schedule/getScheduleById', async ({id}) => {
    try {
        return await instance.get(`schedules/${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveSchedule = createAsyncThunk('schedule/removeSchedule', async ({id}) => {
    try {
        return await instance.delete(`schedules?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchSaveSchedule  = createAsyncThunk('schedule/saveSchedule', async ({data}) => {
    try {
        return await instance.post(`schedules`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetScheduleByDepartureAnDestination = createAsyncThunk('getSchedule', async ({departureId, destinationId}) => {
    try {
        return await instance.get(`schedules/getListDetailByDepartureAndDestination?departureId=${departureId}&destinationId=${destinationId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetScheduleByCode = createAsyncThunk('getScheduleByCode', async ({code}) => {
    try {
        return await instance.get(`schedules/getScheduleByCode?code=${code}`)
    } catch (err) {
        console.error(err)
    }
})
export const scheduleSlice = createSlice({
    name: 'Schedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllSchedule.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveSchedule.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectSchedule = state => state.schedule.list
export default scheduleSlice.reducer