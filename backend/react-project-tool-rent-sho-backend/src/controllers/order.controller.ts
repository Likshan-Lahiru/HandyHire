import { Request, Response } from "express";
import prisma from "../config/database";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.create({ data: req.body });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};


export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};


