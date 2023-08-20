import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchGetAllBookingTicket = createAsyncThunk('getAllBookingTicket', async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
    try {
        return await instance.get(`booking?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCountBookingTicketConfirm = createAsyncThunk('getCountBookingTicketConfirm', async () => {
    try {
        return await instance.get(`booking/count-booking-ticket-confirm`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetBookingTicketByUserIdAndState = createAsyncThunk('getBookingTicketByUserIdAndState', async ({userId, state}) => {
    try {
        return await instance.get(`booking/users/${userId}/state?state=${state}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchPostBookingTicket = createAsyncThunk('postBookingTicket', async ({data}) => {
    try {
        return await instance.post(`booking/create`, data)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetBookingTicketByReservationCode = createAsyncThunk('getGetBookingTicketByReservationCode', async ({slug}) =>{
    try {
        return await instance.get(`booking/reservation-code?code=${slug}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveBooingTicketState = createAsyncThunk(
    'removeBooingTicketStatePending', async ({id}) => {
        try {
            return await instance.delete(`booking/${id}/delete`)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchPutConfirmBookingTicket = createAsyncThunk(
    'putConfirmBookingTicket', async ({id}) => {
        try {
            return await instance.put(`booking/${id}/confirm`)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchPutPaidBookingTicket = createAsyncThunk(
    'putPaidBookingTicket', async ({id}) => {
        try {
            return await instance.put(`booking/${id}/paid`)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchPutCancelBookingTicket = createAsyncThunk(
    'putCancelBookingTicket', async ({id}) => {
        try {
            return await instance.put(`booking/${id}/cancel`)
        } catch (err) {
            console.error(err)
        }
    }
)
export const bookingTicketSlice = createSlice(
    {
        name: 'BookingTicket',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchGetAllBookingTicket.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchGetAllBookingTicket.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    if (action.payload && action.payload.code === 200) {
                        state.list = action.payload.data
                        state.totalItems = action.payload.totalItems
                        state.totalPages = action.payload.totalPages
                    }
                })
                .addCase(fetchGetAllBookingTicket.rejected, (state, action) => {
                    state.status = 'failed'
                })
                .addCase(fetchRemoveBooingTicketState.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchRemoveBooingTicketState.fulfilled, (state, action) => {
                    const {arg: data} = action.meta
                    state.list = state.list.filter((item) => item.id !== data.id)
                    state.status = 'succeeded'
                })
                .addCase(fetchRemoveBooingTicketState.rejected, (state, action) => {
                    state.status = 'failed'
                })
                .addCase(fetchGetBookingTicketByUserIdAndState.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchGetBookingTicketByUserIdAndState.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                })
                .addCase(fetchGetBookingTicketByUserIdAndState.rejected, (state, action) => {
                    state.status = 'failed'
                })
                .addCase(fetchGetBookingTicketByReservationCode.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchGetBookingTicketByReservationCode.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                })
                .addCase(fetchGetBookingTicketByReservationCode.rejected, (state, action) => {
                    state.status = 'failed'
                })
        }
    }
);

export const selectBookingTicket = state => state.bookingTicket.list
export default bookingTicketSlice.reducer

