import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrdersByUserId,
    updateOrder
} from "../controllers/order.controller";


const router = Router();

router.post("/create", createOrder);
router.get("/get-all", getAllOrders);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);
router.get("/user/:user_id", getOrdersByUserId);

export default router;
