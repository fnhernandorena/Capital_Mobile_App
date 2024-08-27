import { View } from "react-native";
import { Stack } from "expo-router";

import { ValueObjectForm } from "../../components/valueObjectForm"; 
export default function CreateValueObject() {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: 'Create Value Object'
                }}
            />
            <ValueObjectForm />
        </View>
    );
}
