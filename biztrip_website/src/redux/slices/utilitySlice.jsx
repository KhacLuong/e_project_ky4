import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllUtility = createAsyncThunk(
    'utility/getAllUtility',
    async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
        try {
            return await instance.get(`utilities?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
        } catch (err) {
            console.error(err);
        }
    }
)
export const fetchGetUtilityById = createAsyncThunk(
    'utility/getUtilityById',
    async ({id}) => {
        try {
            return await instance.get(`utilities/${id}`)
        } catch (err) {
            console.error(err);
        }
    }
)
export const fetchRemoveUtility = createAsyncThunk(
    "utility/removeUtility",
    async ({id}) => {
        try {
            return await instance.delete(`utilities?id=${id}`)
        } catch (err) {
            console.error(err);
        }
    }
);
export const fetchCreateUtility = createAsyncThunk(
    "create",
    async ({data, navigate, toast}) => {
        try {
            const response = await instance.post(`utilities`, data)
            if (response.code === 201) {
                toast.success(response.message)
                await navigate("/admin/v1/cms/coaches/utilities")
            }
            return response
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchUpdateUtility = createAsyncThunk('update', async ({data, navigate, toast}) => {
    try {
        const response = await instance.put(`utilities`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/utilities")
        }
        return response
    } catch (err) {
        console.error(err)
    }
})
export const utilitySlice = createSlice({
    name: 'Utilities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllUtility.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchAllUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveUtility.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchCreateUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCreateUtility.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchCreateUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchUpdateUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUpdateUtility.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchUpdateUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
    },
})
export const selectUtility = state => state.utility.list;
export default utilitySlice.reducer