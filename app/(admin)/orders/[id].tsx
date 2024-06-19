import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import orders from '@/assets/data/orders';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { OrderStatusList, OrderStatus } from '@/types/index'

export default function OrderDetailsScreen() {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('New')
    const { id } = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Not found</Text>;
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
                                                ...(selectedStatus === status ? styles.selectedStatus : {})
                                            }
                                        ]}
                                        onPress={() => setSelectedStatus(status)}
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