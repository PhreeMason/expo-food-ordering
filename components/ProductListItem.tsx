import { Pressable, Text } from 'react-native'
import Colors from '../constants/Colors';
import type { Tables } from '@/types/index';
import { StyleSheet } from 'react-native';
import { Link, useSegments } from 'expo-router';
import RemoteImage from '@/components/RemoteImage'

type ProductListItemProps = {
    product: Tables<'products'>
}

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/camera.jpg'

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage
                    path={product.image}
                    style={styles.image}
                    fallback={defaultPizzaImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
            </Pressable>
        </Link>
    )
}

export default ProductListItem


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flex: 1,
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