import { View, Text } from 'react-native'
import React, { createContext } from 'react'

const CartContext = createContext({})

const CartProvider = ({ children }) => {
    return (
        <CartContext.Provider
            value={{
                items: [],
                onAdItem: () => { }
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider