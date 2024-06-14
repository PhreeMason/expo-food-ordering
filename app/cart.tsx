import { View, Text, Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const { items, addItem } = useCart();
    return (
        <View style={{ height: '100%', padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem orderItem={item} />}
                contentContainerStyle={styles.container}
            />
            <Button text="Checkout" style={styles.button} />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 'auto'
    }
})