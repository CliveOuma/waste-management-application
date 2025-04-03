import express from "express";
import { createOrder, getScheduledOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/schedule", createOrder);
router.get("/scheduled-orders", getScheduledOrders);
router.put("/update-status/:id", updateOrderStatus);
router.delete("/delete/:id", deleteOrder);

export default router;