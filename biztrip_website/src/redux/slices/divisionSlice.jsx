import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllDivisionByScheduleAndDate = createAsyncThunk('getAll', async ({scheduleId, date, status, pageNumber, perPage}) => {
    try {
        return await instance.get(`division?scheduleId=${scheduleId}&date=${date}&status=${status}&pageNumber=${pageNumber}&perPage=${perPage}`)
    } catch (err) {
        console.error(err)
    }
})

export const divisionSlice = createSlice({
    name: 'Divisions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDivisionByScheduleAndDate.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllDivisionByScheduleAndDate.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllDivisionByScheduleAndDate.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectDivision = state => state.division.list;
export default divisionSlice.reducer