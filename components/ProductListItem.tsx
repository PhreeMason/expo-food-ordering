import { View, Text, Image } from 'react-native'
import Colors from '../constants/Colors';
import type { Product } from '../types';
import { StyleSheet } from 'react-native';

const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image || '' }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
        </View>
    )
}

export default ProductListItem


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint
    },
});