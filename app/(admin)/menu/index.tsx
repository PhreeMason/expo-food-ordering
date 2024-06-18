import { StyleSheet, FlatList, Pressable } from 'react-native';
import { View } from '@/components/Themed';

import products from '@/assets/data/products';
import ProductListItem from '@/components/ProductListItem';

const product = products[0];

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductListItem product={item} />}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{ gap: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro',
    },
    listContainer: {
        gap: 10,
        padding: 10,
    }
});
