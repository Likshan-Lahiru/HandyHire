import { Request, Response } from "express";
import prisma from "../config/database";


export const createOrder = async (req: Request, res: Response) => {
    console.log("Calling Order Api")
    try {
        const { user_id, user_name, date, fullPrice, discount, description, orderDetails } = req.body;
        console.log("Print user Id", user_id);


        const order = await prisma.order.create({
            data: { user_id, user_name, date, fullPrice, discount, description },
        });

        // Step 2: Create Order Details and Update Tool Stock
        for (const item of orderDetails) {
            const { tool_id, qty } = item;

            // Create Order Detail entry
            await prisma.orderDetails.create({
                data: { order_id: order.id, tool_id, qty },
            });

            // Reduce tool stock
            await prisma.tool.update({
                where: { id: tool_id },
                data: { remainingCount: { decrement: qty } },
            });
        }

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: { orderDetails: true },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};





export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: req.body,
        });

        res.json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};


export const deleteOrder = async (req: Request, res: Response) => {
    try {

        await prisma.orderDetails.deleteMany({
            where: { order_id: req.params.id },
        });


        await prisma.order.delete({
            where: { id: req.params.id },
        });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};


export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: { user_id: req.params.user_id },
            include: { orderDetails: true },
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's orders", error });
    }
};
