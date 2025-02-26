import express from "express";
/*import { getTools, createTool, updateTool, deleteTool } from "../controllers/tool.controller";*/
import upload from "../config/multerconfig";
import {createTool, deleteTool, getTools, updateTool} from "../controllers/tool.controller";

const router = express.Router();

router.get("/get-all", getTools);
router.post("/create", upload.single("picture"), createTool);
router.put("/update/:id", updateTool);
router.delete("/delete/:id", deleteTool);

export default router;
