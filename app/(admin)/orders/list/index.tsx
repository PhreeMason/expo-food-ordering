import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useInsetOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {
    const { data: orders, error, isLoading } = useAdminOrderList();
    useInsetOrderSubscription()

    if (error) {
        return <Text>Failed to get orders, try again later</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (!orders || orders.length === 0) {
        return <Text>No orders</Text>;
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}