import { View } from "react-native";
import { Stack } from "expo-router";

import { ValueObjectForm } from "../../components/valueObjectForm"; 
export default function EditValueObject() {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: 'Edit Value Object'
                }}
            />
            <ValueObjectForm />
        </View>
    );
}
