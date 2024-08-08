import {   Tabs } from "expo-router";
import { View, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  return (
    <View className="flex-1 ">
      <Tabs>
        <Tabs.Screen 
        name="index"
        options={{
          title: 'Properties',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
        />
        <Tabs.Screen 
        name="saves"
        options={{
          title: 'Saves',
          tabBarIcon: ({ color }) => <FontAwesome name="money" size={24} color={color} />,
        }}
        />
        <Tabs.Screen 
        name="valueObjects"
        options={{
          title: 'Value Objects',
          tabBarIcon: ({ color }) => <FontAwesome name="car" size={24} color={color} />,
        }}
        />
      </Tabs>
    </View>
  );
}
