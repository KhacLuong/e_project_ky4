import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllTestimonial = createAsyncThunk('testimonial/getAll', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`testimonials?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetTestimonialById = createAsyncThunk('testimonial/getById', async ({id}) => {
    try {
        return await instance.get(`testimonials/${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveTestimonial = createAsyncThunk('testimonial/remove', async ({id}) => {
    try {
        return await instance.delete(`testimonials?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchSaveTestimonial = createAsyncThunk('testimonial/save', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`testimonials`, data)
        if (response && response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/users/testimonials")
        }
    } catch (err) {
        console.error(err)
    }
})

export const testimonialSlice = createSlice({
    name: 'Testimonial',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTestimonial.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllTestimonial.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllTestimonial.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveTestimonial.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveTestimonial.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveTestimonial.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveTestimonial.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveTestimonial.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveTestimonial.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectTestimonial = state => state.testimonial.list
export default testimonialSlice.reducer