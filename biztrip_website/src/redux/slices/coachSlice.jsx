import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllCoach = createAsyncThunk('coach/getAllCoach', async ({
                                                                              pageNumber,
                                                                              perPage,
                                                                              sortField,
                                                                              sortDir,
                                                                              keyword
                                                                          }) => {
    try {
        return await instance.get(`coaches?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetCoachById = createAsyncThunk('coach/getCoachById', async ({id}) => {
    try {
        return await instance.get(`coaches/${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchGetCoachByDistanceId = createAsyncThunk('getCoachByDistanceId', async ({distanceId}) => {
    try {
        return await instance.get(`coaches/get_by_distance?id=${distanceId}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveCoach = createAsyncThunk('coach/removeCoach', async ({id}) => {
    try {
        return await instance.delete(`coaches?id=${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchCreateCoach = createAsyncThunk(
    'create', async ({data}) => {
        try {
            return await instance.post(`coaches`, data)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchUpdateCoach = createAsyncThunk(
    'update', async ({data, navigate, toast, setDisableButton}) => {
        try {
            const response = await instance.put(`coaches`, data)
            if (response && response.code === 201) {
                toast.success(response.message)
                await navigate("/admin/v1/cms/coaches/list")
                setDisableButton(false)
            }
        } catch (err) {
            console.error(err)
        }
    }
)

export const fetchGetCoachByDistanceByScheduleAndTime = createAsyncThunk('getCoach', async ({scheduleId, departureInSchedule, destinationInSchedule, date, pageNumber, perPage, sortField, sortDir, timeSlot, priceMin, priceMax, availableSeat, typeRow, pickUp, dropOff, rating}) => {
    try {
        return await instance.get(`coaches/get-coach-by-distance-by-schedule-and-time?scheduleId=${scheduleId}&departureInSchedule=${departureInSchedule}&destinationInSchedule=${destinationInSchedule}&date=${date}&pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&timeSlot=${timeSlot}&priceMin=${priceMin}&priceMax=${priceMax}&availableSeat=${availableSeat}&typeRow=${typeRow}&pickUp=${pickUp}&dropOff=${dropOff}&rating=${rating}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetSeatByCoachIdAndTime = createAsyncThunk('getSeat', async ({coachId, date, startTimeOfDistance, endTimeOfDistance}) => {
    try {
        return await instance.get(`coaches/get-seats-by-coach-id-and-time?coachId=${coachId}&date=${date}&startTimeOfDistance=${startTimeOfDistance}&endTimeOfDistance=${endTimeOfDistance}`)
    } catch (err) {
        console.error(err)
    }
})

export const coachSlice = createSlice({
    name: 'Coaches',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCoachByDistanceByScheduleAndTime.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetCoachByDistanceByScheduleAndTime.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetCoachByDistanceByScheduleAndTime.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchAllCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllCoach.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveCoach.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchCreateCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCreateCoach.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchCreateCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchUpdateCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdateCoach.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchUpdateCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectCoach = state => state.coach.list;
export default coachSlice.reducer