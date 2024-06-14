import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { defaultPizzaImage } from '@/constants/Images';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailWithId = () => {
    const { id } = useLocalSearchParams()
    const product = products.find(product => product.id === Number(id))
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const { addItem } = useCart()

    const addToCart = () => {
        if (!product) return;
        addItem(product, selectedSize)
        router.push('/cart')
    }

    if (!product) {
        return (
            <View>
                <Text>Product not found</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image} />

            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map(size => (
                    <Pressable
                        key={size}
                        onPress={() => setSelectedSize(size)}
                        style={[
                            styles.size,
                            {
                                backgroundColor:
                                    selectedSize === size ? 'gainsboro' : 'white'
                            }

                        ]}>
                        <Text key={size} style={[
                            styles.sizeText,
                            {
                                color:
                                    selectedSize === size ? 'black' : 'gray'
                            }
                        ]}>
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>
                ${product.price}
            </Text>
            <Button onPress={addToCart} text="Add to cart" />
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
        marginTop: 'auto',
        fontWeight: 'bold',
        fontSize: 18,
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 18,
    },
    size: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
