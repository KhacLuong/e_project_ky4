import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllPriceTicket = createAsyncThunk('getAll', async ({
                                                                         pageNumber = 1,
                                                                         perPage = 100,
                                                                         sortField = '',
                                                                         sortDir = '',
                                                                         keyword = ''
                                                                     }) => {
    try {
        return await instance.get(`price-ticket?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetPriceTicketById = createAsyncThunk('getById', async ({id}) => {
    try {
        return await instance.get(`price-ticket/${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchRemovePriceTicket = createAsyncThunk('remove', async ({id}) => {
    try {
        return await instance.delete(`price-ticket?id=${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchCreatePriceTicket = createAsyncThunk('create', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`price-ticket`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/price-ticket")
        }
        return response
    } catch (err) {
        console.error(err)
    }
})
export const fetchUpdatePriceTicket = createAsyncThunk('update', async ({data, navigate, toast}) => {
    try {
        const response = await instance.put(`price-ticket`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/price-ticket")
        }
    } catch (err) {
        console.error(err)
    }
})
export const priceTicketSlice = createSlice({
    name: 'PriceTicket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPriceTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllPriceTicket.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllPriceTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemovePriceTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemovePriceTicket.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemovePriceTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchCreatePriceTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCreatePriceTicket.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchCreatePriceTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchUpdatePriceTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdatePriceTicket.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchUpdatePriceTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectPriceTicket = state => state.priceTicket.list
export default priceTicketSlice.reducer