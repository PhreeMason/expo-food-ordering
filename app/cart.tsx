import { View, Text, Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const { items, total, checkout } = useCart();

    return (
        <View style={{ height: '100%', padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem orderItem={item} />}
                contentContainerStyle={styles.container}
            />
            <Text style={styles.total}>Total: {total.toFixed(2)}</Text>
            <Button text="Checkout" onPress={checkout} />
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