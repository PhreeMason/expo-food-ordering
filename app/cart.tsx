import { View, Text, Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const { items, addItem, total } = useCart();
    return (
        <View style={{ height: '100%', padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem orderItem={item} />}
                contentContainerStyle={styles.container}
            />
            <Text style={styles.total}>Total: {total()}</Text>
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
    total: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 500,
    }
})