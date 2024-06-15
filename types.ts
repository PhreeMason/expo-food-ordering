
export type PizzaSize = 'S' | 'M' | 'L' | 'XL';
export type Product = {
    id: number;
    image: string | null;
    name: string;
    price: number;
};

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';
export type OrderItem = {
    id: string;
    product_id: number;
    product: Product;
    size: PizzaSize;
    quantity: number;
};

export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;
    order_items?: OrderItem[];
};

