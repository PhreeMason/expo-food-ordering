import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
    Database["public"]["Enums"][T];

export type PizzaSize = "S" | "M" | "L" | "XL";
export type Product = Tables<"products">;
export type CartItem = {
    id: string;
    product: Product;
    product_id: number;
    size: PizzaSize;
    quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
    "New",
    "Cooking",
    "Delivering",
    "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type Order = Tables<"orders">;

export type OrderItem = Tables<"order_items">;

export type Profile = Tables<"profiles">;
