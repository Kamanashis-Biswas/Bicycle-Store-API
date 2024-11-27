import { Request, Response, NextFunction } from "express";
import { IOrder, Order } from "../models/Order";
import { IProduct, Product } from "../models/Product";
import { success_resp } from "../utils/success.response";
import mongoose from "mongoose";

const CreateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order_obj: IOrder = req.body;
    const product: IProduct | null = await Product.findById(
      order_obj.product
    ).session(session);

    // if necessary validate the emails.
    //
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json(success_resp.order_not_found_response);
      return;
    }

    // validate price for robust ordering. i am not doing it here.

    // also handle race conditions.
    if (product.quantity - order_obj.quantity < 0)
      throw new Error("Not Enough stock is present for this order.");

    if (!(product.price * order_obj.quantity === order_obj.totalPrice))
      throw new Error("Product Price for quantity doesn't match!");

    const new_order: IOrder | unknown | {} = await Order.create([order_obj], {
      session,
    });
    product.quantity -= order_obj.quantity;
    if (product.quantity === 0) product.inStock = false;
    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    const resp: any = success_resp.order_create_response;
    resp.data = new_order;

    res.json(resp);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

const GetTotalRevenueController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    if (result.length > 0) {
      res.json({
        message: "Revenue calculated successfully",
        status: true,
        data: {
          totalRevenue: result[0].totalRevenue,
        },
      });
    } else {
      res.json({
        message: "No orders found.",
        status: false,
        data: {
          totalRevenue: 0,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const orderControllers = {
  CreateOrderController,
  GetTotalRevenueController,
};
