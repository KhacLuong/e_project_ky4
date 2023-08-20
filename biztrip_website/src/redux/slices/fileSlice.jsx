import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchCreateFile = createAsyncThunk(
    'file/createFile',
    async ({fileData, containerName}) => {
        try {
            return await instance.post(`file?containerName=${containerName}`, fileData)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fileSlice = createSlice({
    name: 'File',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateFile.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.status = 'loading'
            })
            .addCase(fetchCreateFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.status = 'succeeded'
            })
            .addCase(fetchCreateFile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.status = 'failed'
            })
    }
})
export default fileSlice.reducer