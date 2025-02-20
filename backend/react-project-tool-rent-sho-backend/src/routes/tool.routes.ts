import express from "express";
/*import { getTools, createTool, updateTool, deleteTool } from "../controllers/tool.controller";*/
import upload from "../config/multerconfig";
import {createTool} from "../controllers/tool.controller";

const router = express.Router();

/*router.get("/", getTools);*/
router.post("/", upload.single("picture"), createTool);
/*
router.put("/:id", updateTool);
router.delete("/:id", deleteTool);*/

export default router;
