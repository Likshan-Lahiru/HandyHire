import express from "express";
import { getOrderDetails, createOrderDetail } from "../controllers/orderDetails.controller";

const router = express.Router();

router.get("/", getOrderDetails);
router.post("/", createOrderDetail);


export default router;
