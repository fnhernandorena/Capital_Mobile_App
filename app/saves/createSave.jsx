import { View } from "react-native";
import { Stack } from "expo-router";

import { SaveForm } from "../../components/saveForm";
export default function CreateSave() {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: 'Create Save'
                }}
            />
            <SaveForm />
        </View>
    );
}
