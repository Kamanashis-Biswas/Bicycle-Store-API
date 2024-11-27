import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order: mongoose.Model<IOrder> =  mongoose.model<IOrder>("Order", OrderSchema);