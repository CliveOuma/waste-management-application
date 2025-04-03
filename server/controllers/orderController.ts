import { Request, Response } from "express";
import Order from "../models/order";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const {customerName, address, pickupDate, wasteType, contactNumber, timeSlot } = req.body;

    if (!customerName || !address || !pickupDate || !wasteType || !contactNumber || !timeSlot) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        const order = new Order({
            customerName,
            address,
            pickupDate,
            wasteType,
            contactNumber,
            timeSlot,
            status: "Scheduled",
        });
        await order.save();

        res.status(200).json({ message: "Pickup scheduled successfully", order });
    } catch (error) {
        console.error("Error scheduling pickup:", error);
        res.status(500).json({ message: "Server error while scheduling pickup" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Scheduled", "Completed", "Cancelled"].includes(status)) {
          res.status(400).json({ message: "Invalid status update" });
          return;
      }

      const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedOrder) {
          res.status(404).json({ message: "Order not found" });
          return;
      }

      res.status(200).json(updatedOrder);
  } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Server error while updating order status" });
  }
};

export const getScheduledOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ status: "Scheduled" });
    res.json(orders);
  } catch (error: unknown) {
    console.error("Error fetching scheduled orders:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error while deleting order" });
  }
};