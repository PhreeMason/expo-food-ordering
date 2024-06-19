import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { OrderStatusList, OrderStatus } from '@/types/index'
import { useOrderDetails } from '@/api/orders';

export default function OrderDetailsScreen() {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('New')
    const { id: idString } = useLocalSearchParams()
    const id = idString && parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { data: order, error, isLoading } = useOrderDetails(id || 0);

    useEffect(() => {
        if(!order) return;
        setSelectedStatus(order.status as OrderStatus)
    }, [order])

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
                data={[]}
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