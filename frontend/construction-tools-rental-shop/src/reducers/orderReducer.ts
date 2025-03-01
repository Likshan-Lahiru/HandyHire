import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import orderModel from "../model/OrderModel.ts";


export const initialState: orderModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
});

export const getOrders = createAsyncThunk("order/getOrders", async () => {
    try {
        const response = await api.get("/orders/get-all");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const addOrder = createAsyncThunk("order/addOrder", async (newOrder: FormData) => {
    try {
        const response = await api.post("/orders/create", newOrder, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateOrder = createAsyncThunk("order/updateOrder", async ({ id, updatedOrder }: { id: string; updatedOrder: Partial<orderModel> }) => {
    try {
        const response = await api.put(`/orders/update/${id}`, updatedOrder);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id: string) => {
    try {
        await api.delete(`/orders/delete/${id}`);
        return id;
    } catch (error) {
        throw error;
    }
});

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.splice(0, state.length);
                state.push(...action.payload);
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.findIndex((order) => order.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                return state.filter((order) => order.id !== action.payload);
            });
    },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
