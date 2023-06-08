
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
            tabBarActiveBackgroundColor: '#45a3fd',
            tabBarInactiveBackgroundColor:'#0583fc',
        }}
    >
      <Tab.Screen name="Customer" component={CustomerScreen} options={{title:'Reservas',
       tabBarIcon:({tabInfo})=>(
         <MaterialIcons name="account-circle" size={30} color='white' />
       )
       }} />
      {/* <Tab.Screen name="Customer" component={CustomerScreen} options={{title:'Reservas',
       tabBarIcon:({color})=>(
         <MaterialIcons name="account-circle" size={25} color='red' />
       )
       }} /> */}
      <Tab.Screen name="List" component={ListCustomer} options={{title:'Listado Reservas',
      tabBarIcon:({tabInfo})=>(
        <MaterialIcons name="view-list" size={30} color='white' />
      )
    }} />
    </Tab.Navigator>
  );
}