import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import upload from "../config/multerconfig";

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
        console.log("calling createTool")
        let { name, description, rentPricePerDay, remainingCount, category_id } = req.body;
        console.log("calling createTool")

        let base64Image = "";
        if (req.file) {

            const fileBuffer = fs.readFileSync(req.file.path);
            base64Image = fileBuffer.toString("base64");


            fs.unlinkSync(req.file.path);
        }

        category_id = "67b745ab221c6ec285b911e9"


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



export const getToolById = (req: Request, res: Response) => {
    const { id } = req.params;

    prisma.tool.findUnique({
        where: { id },
        include: { category: true, orderDetails: true }
    })
        .then(tool => {
            if (!tool) {
                res.status(404).json({ error: "Tool not found" });
            } else {
                res.json(tool);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch tool" });
        });
};

export const getToolByName = (req: Request, res: Response) => {
    const { name } = req.params;
    console.log("Print search tool name:", name);

    prisma.tool.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive"
            }
        },
        include: { category: true, orderDetails: true }
    })
        .then(tool => {
            if (!tool) {
                res.status(404).json({ error: "Tool not found" });
            } else {
                res.json(tool);
            }
        })
        .catch(error => {
            console.error("Database error:", error);
            res.status(500).json({ error: "Failed to fetch tool" });
        });
};



export const updateTool = async (req: Request, res: Response) => {
    upload.single("picture")(req, res, async (err) => {
        if (err) return res.status(400).json({ error: "File upload failed" });

        console.log("Calling tool update API");


        const { id } = req.params;
        const { name, description, rentPricePerDay, remainingCount, category_id, picture } = req.body;
        try {
            const tool = await prisma.tool.update({
                where: { id },
                data: {
                    name,
                    description,
                    rentPricePerDay: Number(rentPricePerDay),
                    remainingCount: Number(remainingCount),
                    category_id,

                }
            });
            return res.json(tool);
        } catch (error) {
            console.error("Error updating tool:", error);
            return res.status(500).json({ error: "Failed to update tool" });
        }
    });
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

export async function getStats(req: Request, res: Response) {
    try {
        const totalOrdersPrice = await prisma.order.aggregate({
            _sum: { fullPrice: true },
        });
        const totalOrdersCount = await prisma.order.count();
        const totalUserCount = await prisma.order.aggregate({
            _count: { user_id: true },
        });
        const totalToolCount = await prisma.tool.count();

        res.json({
            totalOrdersPrice: totalOrdersPrice._sum.fullPrice || 0,
            totalOrdersCount,
            totalUserCount: totalUserCount._count.user_id,
            totalToolCount,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
