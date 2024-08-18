import { View, Text } from "react-native"
import { Stack } from "expo-router"

import { PropertieForm } from "../components/propertieForm"
export default function CreatePropertie(){
    return (
        <View>
        <Stack.Screen
        options={{
            headerTitle: 'Create propertie'
        }}
        />
        <Text>Create propertie!</Text>
        <PropertieForm/>
        </View>
    )
}