import express, { Router } from "express";
import { prodController } from "../controllers/productController";
import { orderControllers } from "../controllers/orderController";

const rr: Router = express.Router();

rr.get("/", (req, res)=>{res.send("OK")});
rr.post('/products', prodController.InsertPorductController);
rr.get('/products', prodController.GetPorductsController);
rr.get('/products/:productId', prodController.GetproductDetailController);
rr.put('/products/:productId', prodController.UpdateProductController);
rr.delete('/products/:productId', prodController.DeleteProductDetailController);


rr.post('/orders', orderControllers.CreateOrderController);
rr.get('/orders/revenue', orderControllers.GetTotalRevenueController);

export default rr;
