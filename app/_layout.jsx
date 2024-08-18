import {   Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {  
  return (
    <View className="flex-1 ">
      <Stack
        screenOptions={{
          title: 'Capital App',
        }}
      />
    </View>
  );
}
