import { View, Text, StyleSheet } from 'react-native';

import { CartItem } from '@/types/index';
import Colors from '@/constants/Colors';
import { defaultPizzaImage } from '@/constants/Images';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '@/providers/CartProvider';
import RemoteImage from './RemoteImage';

type CartListItemProps = {
    orderItem: CartItem;
};

const CartListItem = ({ orderItem }: CartListItemProps) => {
    const { product } = orderItem
    const { updateQuantity } = useCart();
    return (
        <View style={styles.container}>
            <RemoteImage
                fallback={defaultPizzaImage}
                path={product.image}
                style={styles.image}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{orderItem.product.name}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>${orderItem.product.price.toFixed(2)}</Text>
                    <Text>Size: {orderItem.size}</Text>
                </View>
            </View>
            <View style={styles.quantitySelector}>
                <FontAwesome
                    onPress={() => updateQuantity(orderItem.id, -1)}
                    name="minus"
                    color="gray"
                    style={{ padding: 5 }}
                />

                <Text style={styles.quantity}>{orderItem.quantity}</Text>
                <FontAwesome
                    onPress={() => updateQuantity(orderItem.id, 1)}
                    name="plus"
                    color="gray"
                    style={{ padding: 5 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 18,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});

export default CartListItem;