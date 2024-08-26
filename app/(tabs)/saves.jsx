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
              <View className="flex flex-row justify-between items-center w-full">
                <Text className="text-3xl">{save.title}</Text>
                <View className="flex flex-row gap-2 mr-2">
                  <Link
                    href={{
                      pathname: "/saves/[id]",
                      params: { id: save.id },
                    }}
                    asChild
                  >
                    <Pressable>
                      <FontAwesome
                        name="pencil-square-o"
                        size={28}
                        color="black"
                      />
                    </Pressable>
                  </Link>
                  <Pressable onPress={() => deleteSave(save.id)}>
                    <FontAwesome name="trash" size={28} color="black" />
                  </Pressable>
                </View>
              </View>
              <View className="flex w-full flex-row flex-wrap">
                <Text className="w-1/2">Currency: {save.currency}</Text>
                <Text className="w-1/2">Amount: {save.amount}</Text>
              </View>
              <Text className="text-xl">Location: {save.location}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Link asChild href="/saves/createSave">
        <Pressable className="bg-gray-500/30 items-center flex p-1 rounded-3xl mb-1">
          <FontAwesome name="plus-circle" size={24} color="black" />
        </Pressable>
      </Link>
    </ScreenLayout>
  );
}
