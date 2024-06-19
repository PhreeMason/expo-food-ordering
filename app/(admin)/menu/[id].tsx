import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import { Stack, router, useLocalSearchParams, Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { defaultPizzaImage } from '@/constants/Images';
import { PizzaSize } from '@/types/types';
import { useProduct } from '@/api/products';
import { useCart } from '@/providers/CartProvider';
import { useState } from 'react';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailWithId = () => {
    const { id: idString } = useLocalSearchParams()
    const id = idString && parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: product, isLoading, error } = useProduct(id || 0)
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const { addItem } = useCart()

    const addToCart = () => {
        if (!product) return;
        addItem(product, selectedSize)
        router.push('/cart')
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to get products, try again later</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: product.name,
                    headerRight: () => (
                        <Link href={`./create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image} />

            <Text style={styles.price}>{product.name}</Text>
            <Text style={styles.price}>
                ${product.price}
            </Text>
        </View>
    )
}

export default ProductDetailWithId

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});
