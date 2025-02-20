import { Request, Response } from "express";
import prisma from "../config/database";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.create({ data: req.body });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

