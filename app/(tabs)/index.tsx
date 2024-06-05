import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import products from '@/assets/data/products';
import ProductListItem from '@/components/ProductListItem';


const product = products[0];

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
            <ProductListItem product={product} />
        </View>
    );
}

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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
