import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ToolModel from "../model/ToolModel.ts";
import axios from "axios";



export const initialState: ToolModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
});


export const getTools = createAsyncThunk("tool/getTools", async () => {
    try {
        const response = await api.get("/tools/get-all");
        return response.data.map((tool: ToolModel) => ({
            ...tool,
            picture: `data:image/png;base64,${tool.picture}`,
        }));
    } catch (error) {
        throw error;
    }
});


export const addTool = createAsyncThunk(
    "tool/addTool",
    async (newTool: FormData) => {
        try {
            const response = await api.post("/tools/create", newTool, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);



export const updateTool = createAsyncThunk(
    "tool/updateTool",
    async ({ id, updatedTool }: { id: string; updatedTool: Partial<ToolModel> }) => {
        try {
            const response = await api.put(`/tools/update/${id}`, updatedTool);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const deleteTool = createAsyncThunk("tool/deleteTool", async (id: string) => {
    try {
        await api.delete(`/tools/delete/${id}`);
        return id;
    } catch (error) {
        throw error;
    }
});


const toolSlice = createSlice({
    name: "tool",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getTools.fulfilled, (state, action) => {
                state.splice(0, state.length);
                state.push(...action.payload);
            })
            .addCase(getTools.rejected, () => {
                console.log("Fetching tools failed");
            })
            .addCase(getTools.pending, () => {
                console.log("Fetching tools pending");
            });


        builder
            .addCase(addTool.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addTool.rejected, () => {
                console.log("Adding tool failed");
            })
            .addCase(addTool.pending, () => {
                console.log("Adding tool pending");
            });


        builder
            .addCase(updateTool.fulfilled, (state, action) => {
                const index = state.findIndex((tool) => tool.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateTool.rejected, () => {
                console.log("Updating tool failed");
            })
            .addCase(updateTool.pending, () => {
                console.log("Updating tool pending");
            });


        builder
            .addCase(deleteTool.fulfilled, (state, action) => {
                return state.filter((tool) => tool.id !== action.payload);
            })
            .addCase(deleteTool.rejected, () => {
                console.log("Deleting tool failed");
            })
            .addCase(deleteTool.pending, () => {
                console.log("Deleting tool pending");
            });
    },
});

export const {} = toolSlice.actions;
export default toolSlice.reducer;
