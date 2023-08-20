import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllDistance = createAsyncThunk('distance/getAll', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`distances?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetDistanceByCoachId = createAsyncThunk('distance/getByCoachId', async ({coachId}) => {
    try {
        return await instance.get(`distances/detail_by_coach?coachId=${coachId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetDistanceById = createAsyncThunk('distancegetById', async ({id}) => {
    try {
        return await instance.get(`distances/${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchSaveDistance = createAsyncThunk('distance/save', async ({coachId, data}) => {
    try {
        return await instance.post(`distances?coachId=${coachId}`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveDistance = createAsyncThunk('distance/remove', async ({id}) => {

})
export const fetchSavePickUpPoint = createAsyncThunk('pickUp/save', async ({distanceId, data}) => {
    try {
        return await instance.post(`pick_up_points/create_list?distanceId=${distanceId}`, data)
    } catch (err) {
        console.error(err)
    }
})
export const fetchSaveDropOffPoint = createAsyncThunk('dropOff/save', async ({distanceId, data}) => {
    try {
        return await instance.post(`drop_off_points/create_list?distanceId=${distanceId}`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetCountOfDistanceInDawn = createAsyncThunk('distance/get-count-in-dawn', async ({scheduleId}) => {
    try {
        return await instance.get(`distances/get-count-distance-in-dawn?scheduleId=${scheduleId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCountOfDistanceInMorning = createAsyncThunk('distance/get-count-in-morning', async ({scheduleId}) => {
    try {
        return await instance.get(`distances/get-count-distance-in-morning?scheduleId=${scheduleId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCountOfDistanceInAfternoon = createAsyncThunk('distance/get-count-in-afternoon', async ({scheduleId}) => {
    try {
        return await instance.get(`distances/get-count-distance-in-afternoon?scheduleId=${scheduleId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCountOfDistanceInEvening = createAsyncThunk('distance/get-count-in-evening', async ({scheduleId}) => {
    try {
        return await instance.get(`distances/get-count-distance-in-evening?scheduleId=${scheduleId}`)
    } catch (err) {
        console.error(err)
    }
})
export const distanceSlice = createSlice({
    name: 'Distance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDistance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllDistance.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllDistance.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveDistance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveDistance.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveDistance.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveDistance.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveDistance.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveDistance.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectDistance = state => state.distance.list
export default distanceSlice.reducer