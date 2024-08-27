import { View } from "react-native";
import { Stack } from "expo-router";

import { SaveForm } from "../../components/saveForm";
export default function EditSave() {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: 'Edit Save'
                }}
            />
            <SaveForm />
        </View>
    );
}
