import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useState } from 'react'
import { OrderItem, PizzaSize, Product } from '@/types'
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: OrderItem[],
    addItem: (item: Product, size: PizzaSize) => void
    updateQuantity: (itemId: string, quantity: -1 | 1) => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<OrderItem[]>([])

    const updateQuantity = (itemId: string, quantity: -1 | 1) => {
        setItems(items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i).filter(i => i.quantity > 0))
    }

    const addItem = (item: Product, size: PizzaSize) => {
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
        console.log(item, size)
    }
    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                updateQuantity
            }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

export default CartProvider