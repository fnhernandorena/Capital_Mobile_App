import { View, Text } from "react-native"
import { Stack } from "expo-router"

import { PropertieForm } from "../../components/propertieForm"
export default function EditPropertie(){
    return (
        <View>
        <Stack.Screen
        options={{
            headerTitle: 'Edit propertie'
        }}
        />
        <PropertieForm/>
        </View>
    )
}