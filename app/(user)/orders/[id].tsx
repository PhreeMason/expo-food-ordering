
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useOrderDetails } from '@/api/orders';
import { useUpdateOrderSubscription } from '@/api/orders/subscriptions';

export default function OrderDetailsScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString![0]);

    const { data: order, error, isLoading } = useOrderDetails(id || 0);
    useUpdateOrderSubscription(id);

    if (error) {
        return <Text>Failed to get orders, try again later</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (!order) {
        return <Text>Order not found</Text>;
    }

    return (
        <View style={{ padding: 10, gap: 20, flex: 1 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    );
}