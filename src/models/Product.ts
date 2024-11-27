import mongoose, { Schema, Document } from "mongoose";

enum BicycleType {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
}

const ProuctSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, enum: Object.values(BicycleType), required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProuctSchema.pre("save", function () {
  this.inStock = this.quantity > 0;
});

export const Product : mongoose.Model<IProduct> = mongoose.model<IProduct>("Product", ProuctSchema);

