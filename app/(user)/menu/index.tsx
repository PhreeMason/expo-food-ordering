import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import products from '@/assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { Stack } from 'expo-router';

const product = products[0];

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: "Menu" }}
            />
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
