import { Request, Response, NextFunction } from "express";
import { IProduct, Product } from "../models/Product";
import { success_resp } from "../utils/success.response";


const InsertPorductController = async (req: Request, res: Response, next: NextFunction)=> {
  try{
    const prod_obj: IProduct =  req.body as any;
    const prod: IProduct = await Product.create(prod_obj);

    const resp: any = success_resp.product_craete_response;
    resp.data = prod;

    res.json(resp);
  }catch(err){
    next(err);
  }
}


const GetPorductsController = async (req: Request, res: Response, next: NextFunction)=> {
  try{
    const {searchTerm} = req.query;
    const m_obj: any = {};

    if(searchTerm){
      m_obj.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { barnd: { $regex: searchTerm, $options: 'i' } },
        { type: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const products: IProduct[] = await Product.find(m_obj);
    const resp:any = success_resp.products_retrieve_response;
    resp.data = products;
    res.json(resp);

  }catch(err){
    next(err);
  }
}

const GetproductDetailController = async (req: Request, res: Response, next: NextFunction)=> {
  try{
    const {productId} = req.params;
      
    const product: IProduct | null = await Product.findById(productId);
    const resp:any = success_resp.product_retrieve_response;
    resp.data = product;
    res.json(resp);

  }catch(err){
    next(err);
  }
}

const UpdateProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { price, quantity } = req.body;
    
    const product: IProduct | null = await Product.findById(productId);

    if (product) {
      if (Number.isInteger(quantity) && quantity > 0) {
        product.inStock = true;
        product.quantity = quantity;
      } else if (Number.isInteger(quantity) && quantity <= 0) {
        product.inStock = false;
        product.quantity = 0;
      } else {
        throw new Error("Quantity should be a valid integer greater than or equal to 1!");
      }

      if (!isNaN(price) && price > 0) {
        product.price = price; // Ensure price is a float with 2 decimal points
      } else {
        throw new Error("Price should be a valid positive number!");
      }

      await product.save();
    } else {
      throw new Error("Product not found!");
    }

    const resp: any = success_resp.product_update_response;
    resp.data = product;

    res.json(resp);

  } catch (err) {
    next(err);
  }
};


const DeleteProductDetailController = async (req: Request, res: Response, next: NextFunction)=> {
  try{
    const {productId} = req.params;
      
    await Product.findByIdAndDelete(productId);
    const resp:any = success_resp.product_delete_response;
    res.json(resp);
  }catch(err){
    next(err);
  }
}


export const prodController = {
  InsertPorductController,
  GetPorductsController,
  GetproductDetailController,
  UpdateProductController,
  DeleteProductDetailController
};