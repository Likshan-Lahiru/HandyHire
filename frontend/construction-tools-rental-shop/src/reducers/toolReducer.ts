import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ToolModel from "../model/ToolModel.ts";
import axios from "axios";



export const initialState: ToolModel[] = [];

const api = axios.create({
        baseURL: 'http://localhost:8000/api/',
    }
)


export const getTools = createAsyncThunk("tool/getTools", async () => {
    try {
        console.log("Fetching tools from API...");
        const response = await api.get("/tools/get-all");
        console.log("API Response:", response.data);
        return response.data.map((tool: ToolModel) => ({
            ...tool,
            picture: `data:image/png;base64,${tool.picture}`,
        }));
    } catch (error) {
        console.error("Error fetching tools:", error);
        throw error;
    }
});



const toolSlice = createSlice({
    name: "customer",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTools.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getTools.rejected, (state, action) => {
            console.log("tool tool rejected");
             })
            .addCase(getTools.pending, (state, action) => {
                console.log("Tools get pending");
            })
    }
});

export const {} = toolSlice.actions;
export default toolSlice.reducer;
