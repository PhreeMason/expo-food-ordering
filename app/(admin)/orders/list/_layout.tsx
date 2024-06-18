import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ArchivedOrders from './archive'
import ActiveOrders from './index'

const Tab = createMaterialTopTabNavigator();

function Orders() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Active" component={ActiveOrders} />
            <Tab.Screen name="Archive" component={ArchivedOrders} />
        </Tab.Navigator>
    );
}

export default Orders;