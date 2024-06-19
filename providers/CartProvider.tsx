import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { OrderItem, PizzaSize, Tables } from '@/types/index'
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: OrderItem[],
    addItem: (item: Tables<'products'>, size: PizzaSize) => void
    updateQuantity: (itemId: number, quantity: -1 | 1) => void
    total: () => string
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: () => '0.00'
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<OrderItem[]>([])

    const updateQuantity = (itemId: number, quantity: -1 | 1) => {
        setItems(items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i).filter(i => i.quantity > 0))
    }

    const addItem = (item: Tables<'products'>, size: PizzaSize) => {
        const existingItem = items.find(i => i.product_id === item.id && i.size === size)
        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }
        const newCartItem: OrderItem = {
            id: randomUUID(),
            product: item,
            product_id: item.id,
            size,
            quantity: 1
        }
        setItems([...items, newCartItem])
    }

    const total = () => items.reduce((sum: number, item: OrderItem) => sum + item.product.price * item.quantity, 0).toFixed(2)
    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity,
                total
            }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

export default CartProvider