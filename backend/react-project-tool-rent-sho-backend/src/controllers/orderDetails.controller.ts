import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrderDetails = async (req: Request, res: Response) => {
    try {
        const orderDetails = await prisma.orderDetails.findMany();
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: "Error fetching order details" });
    }
};

export const createOrderDetail = async (req: Request, res: Response) => {
    try {

        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: "Error creating order detail" });
    }
};

