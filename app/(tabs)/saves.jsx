import { Text, Pressable, ScrollView, View, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { GetSaves, StartDB, DeleteSave } from "../../utils/SavesDb";

export default function Index() {
  const [saves, setSaves] = useState(null);

  async function deleteSave(id) {
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to delete this save?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await DeleteSave(id);
            const savesList = await GetSaves();
            setSaves(savesList);
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function startDb() {
      await StartDB();
      const savesList = await GetSaves();
      setSaves(savesList);
    }
    startDb();
  }, []);

  return (
    <ScreenLayout>
      {saves === null ? (
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      ) : saves.length === 0 ? (
        <ScrollView>
          <Text>No saves here!</Text>
        </ScrollView>
      ) : (
        <ScrollView>
          {saves.map((save) => (
            <View className="flex" key={save.id}>
                <Text className="text-3xl">{save.title}</Text>
              <Text className="text-zinc-600">Location: {save.location}</Text>
                <Text className="text-xl">{save.currency} {save.amount}</Text>
              <View className="flex flex-row">
                <View className="p-1 w-1/2">
                  <Link
                    href={{
                      pathname: "/saves/[id]",
                      params: { id: save.id },
                    }}
                    asChild
                  >
                    <Pressable className="bg-yellow-600 flex flex-row items-center p-1 rounded-full justify-center">
                      <FontAwesome
                        name="pencil-square-o"
                        size={20}
                        color="white"
                      />
                      <Text className="text-white mx-1">Edit</Text>
                    </Pressable>
                  </Link>
                </View>
                <View className="p-1 w-1/2">
                  <Pressable
                    className="bg-red-600 flex flex-row items-center p-1 rounded-full justify-center"
                    onPress={() => deleteSave(save.id)}
                  >
                    <FontAwesome name="trash" size={20} color="white" />
                    <Text className="text-white mx-1">Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <Link asChild href="/saves/createSave">
        <Pressable className="bg-green-600 items-center flex p-1 rounded-3xl mb-1">
          <FontAwesome name="plus-circle" size={24} color="white" />
        </Pressable>
      </Link>
    </ScreenLayout>
  );
}
