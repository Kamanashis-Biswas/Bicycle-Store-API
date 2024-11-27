const product_craete_response: object = {
   message: "Bicycle created successfully",
   success: true,
   data: null,
};

const products_retrieve_response: object = {
  message: "Bicycles retrieved successfully",
  status: true,
  data: null
}

const product_retrieve_response: object = {
  message: "Bicycle retrieved successfully",
  status: true,
  data: null
}

const product_update_response: object = {
  message: "Bicycle updated successfully",
  status: true,
  data: null
}

const product_delete_response: object = {
  message: "Bicycle deleted successfully",
  status: true,
  data: {}
}

const order_not_found_response: object = {
  message: "Product not found",
  status: false,
  data: null
}

const order_create_response: object = {
  message: "Order created successfully",
  status: true,
  data: null
};



export const success_resp = {
    product_craete_response,
    products_retrieve_response,
    product_retrieve_response,
    product_update_response,
    product_delete_response,
    order_not_found_response,
    order_create_response
}