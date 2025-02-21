import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();



export const getTools = async (req: Request, res: Response) => {
    try {
        console.log("calling get Api")
        const tools = await prisma.tool.findMany();
        res.json(tools);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tools" });
    }
};

export const createTool = async (req: Request, res: Response) => {
    try {
        const { name, description, rentPricePerDay, remainingCount, category_id } = req.body;

        let base64Image = "";
        if (req.file) {

            const fileBuffer = fs.readFileSync(req.file.path);
            base64Image = fileBuffer.toString("base64");


            fs.unlinkSync(req.file.path);
        }


        const tool = await prisma.tool.create({
            data: {
                name,
                description,
                rentPricePerDay: Number(rentPricePerDay),
                remainingCount: Number(remainingCount),
                category_id,
                picture: base64Image
            }
        });

        res.status(201).json(tool);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tool" });
    }
};

export const getToolById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tool = await prisma.tool.findUnique({
            where: { id },
            include: { category: true, orderDetails: true }
        });
        if (!tool) return res.status(404).json({ error: "Tool not found" });
        res.json(tool);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tool" });
    }
};



export const updateTool = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tool = await prisma.tool.update({
            where: { id },
            data: req.body
        });
        res.json(tool);
    } catch (error) {
        res.status(500).json({ error: "Failed to update tool" });
    }
};

export const deleteTool = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.tool.delete({ where: { id } });
        res.json({ message: "Tool deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tool" });
    }
};
