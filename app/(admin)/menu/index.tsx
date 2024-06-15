import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';

import products from '@/assets/data/products';
import ProductListItem from '@/components/ProductListItem';

const product = products[0];

export default function TabOneScreen() {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: "Menu",
                headerRight: () => (
                    <Link href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="plus-square-o"
                                    size={25}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),

                }}
            />
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductListItem product={item} />}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{gap: 10}}
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
