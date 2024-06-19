import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
    Database['public']['Enums'][T];


export type Product = Tables<'products'>;

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export const OrderStatusList: OrderStatus[] = [
    'New',
    'Cooking',
    'Delivering',
    'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = Tables<'orders'>;

export type OrderItem = Tables<'order_items'>;

export type Profile = Tables<'profiles'>;