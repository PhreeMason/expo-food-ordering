import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';
import { OrderStatusList } from '@/types/index'
import { useOrderDetails, useUpdateOrder } from '@/api/orders';

export default function OrderDetailsScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString![0]);

    const { data: order, error, isLoading } = useOrderDetails(id);
    const { mutate: updateOrder } = useUpdateOrder();

    const updateStatus = (status: string) => {
        updateOrder({ id, updatedFields: { status } })
    }

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
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => (
                    <>
                        <Text style={styles.statusHeader}>Status</Text>
                        <View style={styles.orderStatus}>
                            {
                                OrderStatusList.map(status => (
                                    <Text
                                        key={status}
                                        style={[
                                            styles.orderStatusText, {
                                                ...(order.status === status ? styles.selectedStatus : {})
                                            }
                                        ]}
                                        onPress={() => updateStatus(status)}
                                    >
                                        {status}
                                    </Text>
                                ))
                            }
                        </View>
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    orderStatus: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 5
    },
    orderStatusText: {
        padding: 8,
        color: Colors.light.tint,
        fontWeight: '500',
        borderStyle: 'solid',
        borderColor: Colors.light.tint,
        borderWidth: 2,
        borderRadius: 5
    },
    statusHeader: {
        fontWeight: 'bold'
    },
    selectedStatus: {
        color: 'white',
        backgroundColor: Colors.light.tint
    }
})