import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Stack, router, useLocalSearchParams, Link } from 'expo-router';
import products from '@/assets/data/products';
import Colors from '@/constants/Colors';
import { PizzaSize } from '@/types';
import { defaultPizzaImage } from '@/constants/Images';
import { FontAwesome } from '@expo/vector-icons';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailWithId = () => {
    const { id } = useLocalSearchParams()
    const product = products.find(product => product.id === Number(id))

    if (!product) {
        return (
            <View>
                <Text>Product not found</Text>
            </View>
        )
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
