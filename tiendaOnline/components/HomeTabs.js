
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from './CustomerScreen';
import ListCustomer from './ListCustomer';
import {MaterialIcons} from '@expo/vector-icons'


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarInactiveBackgroundColor:'blue',
        }}
    >
      <Tab.Screen name="Customer" component={CustomerScreen} options={{title:'Clientes',
       tabBarIcon:({color})=>(
         <MaterialIcons name="account-circle" size={25} color='red' />
       )
       }} />
      <Tab.Screen name="List" component={ListCustomer} options={{title:'Listado clientes',
      tabBarIcon:({color})=>(
        <MaterialIcons name="view-list" size={25} color='green' />
      )
    }} />
    </Tab.Navigator>
  );
}