import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  return (
    <View className="flex-1 ">
      <Stack
        screenOptions={{
          title: "Capital App",
          headerBackTitleVisible: false,
          headerRight: () => {
            return (
              <Link href="help/aiHelp" asChild>
                <Pressable>
                  <FontAwesome name="headphones" size={24} color="black" />
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </View>
  );
}
