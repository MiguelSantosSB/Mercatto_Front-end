export interface CartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface CartResponse {
  id: number;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  paymentMethod: string;
  shippingAddress: string;
}

export interface OrderResponse {
  orderId: number;
  status: string;
  total: number;
}
