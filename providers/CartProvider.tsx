import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { OrderItem, PizzaSize, Tables, TablesInsert } from '@/types/index'
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '@/api/orders'
import { useRouter } from 'expo-router'

type CartType = {
    items: OrderItem[],
    addItem: (item: Tables<'products'>, size: PizzaSize) => void
    updateQuantity: (itemId: number, quantity: -1 | 1) => void
    total: () => string;
    checkout: () => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: () => '0.00',
    checkout: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<OrderItem[]>([])
    const { mutate: insertOrder } = useInsertOrder();
    const router = useRouter();

    const updateQuantity = (itemId: number, quantity: -1 | 1) => {
        setItems(items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i).filter(i => i.quantity > 0))
    }

    const addItem = (item: Tables<'products'>, size: PizzaSize) => {
        const existingItem = items.find(i => i.product_id === item.id && i.size === size)
        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }
        const newOrderItem: TablesInsert<'order_items'> = {
            product_id: item.id,
            size,
            quantity: 1
        }
        setItems([...items, newOrderItem])
    }


    const clearCart = () => {
        setItems([])
    }
    const checkout = () => {
        console.warn('checkout');
        insertOrder(
            // @ts-ignore
            { total: parseFloat(total()) },
            {
                onSuccess: (data) => {
                    console.log(data)
                    clearCart()
                    router.push(`/(user)/orders/${data.id}`)
                }
            }
        )
    }

    const total = () => items.reduce((sum: number, item: OrderItem) => sum + item.product.price * item.quantity, 0).toFixed(2)
    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                total,
                checkout
            }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

export default CartProvider