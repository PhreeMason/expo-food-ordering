import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import ProductListItem from '@/components/ProductListItem';
import { Stack } from 'expo-router';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
    const { data: products, isLoading, error } = useProductList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Failed to get products, try again later</Text>
    }

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
