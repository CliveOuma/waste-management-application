import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customerName: string;
  address: string;
  pickupDate: Date;
  wasteType: string;
  contactNumber: string;
  timeSlot: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const OrderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    wasteType: { type: String, required: true },
    contactNumber: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Completed"], default: "Scheduled" },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
