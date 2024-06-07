import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products';
import Colors from '@/constants/Colors';
import { useState } from 'react';

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/camera.jpg'

const sizes = ['S', 'M', 'L', 'XL']

const ProductDetailWithId = () => {
    const { id } = useLocalSearchParams()
    const product = products.find(product => product.id === Number(id))
    const [selectedSize, setSelectedSize] = useState<string>('M');

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
                        onPress={() => setSelectedSize(size)}
                        style={[
                            styles.size,
                            {
                                backgroundColor:
                                    selectedSize === size ? Colors.light.tint : 'gainsboro'
                            }

                        ]}>
                        <Text key={size} style={styles.sizeText}>{size}</Text>
                    </Pressable>
                ))}
            </View>
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
        // color: Colors.light.tint,
        fontWeight: 'bold',
        fontSize: 18,
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 18,
    },
    size: {
        backgroundColor: 'gainsboro',
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
