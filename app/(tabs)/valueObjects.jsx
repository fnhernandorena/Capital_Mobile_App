import { Text, Pressable, ScrollView, View, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { GetValueObjects, StartDB, DeleteValueObject } from "../../utils/ValueObjectsDb";

export default function Index() {
  const [valueObjects, setValueObjects] = useState(null);

  async function deleteValueObject(id) {
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to delete this value object?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await DeleteValueObject(id);
            const objects = await GetValueObjects();
            setValueObjects(objects);
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function startDb() {
      await StartDB();
      const objects = await GetValueObjects();
      setValueObjects(objects);
    }
    startDb();
  }, []);

  return (
    <ScreenLayout>
      {valueObjects === null ? (
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      ) : valueObjects.length === 0 ? (
        <ScrollView>
          <Text>No value objects here!</Text>
        </ScrollView>
      ) : (
        <ScrollView>
          {valueObjects.map((valueObject) => (
            <View className="flex" key={valueObject.id}>
              <View className="flex flex-row justify-between items-center w-full">
                <Text className="text-3xl">{valueObject.title}</Text>
                <View className="flex flex-row gap-2 mr-2">
                  <Link
                    href={{
                      pathname: "/valueObjects/[id]",
                      params: { id: valueObject.id },
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
                  <Pressable onPress={() => deleteValueObject(valueObject.id)}>
                    <FontAwesome name="trash" size={28} color="black" />
                  </Pressable>
                </View>
              </View>
              <View className="flex w-full flex-row flex-wrap">
                <Text className="w-1/2">Quantity: {valueObject.quantity}</Text>
                <Text className="w-1/2">Value: {valueObject.value}</Text>
              </View>
              <Text className="text-xl">Description: {valueObject.description}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Link asChild href="/valueObjects/createValueObject">
        <Pressable className="bg-gray-500/30 items-center flex p-1 rounded-3xl mb-1">
          <FontAwesome name="plus-circle" size={24} color="black" />
        </Pressable>
      </Link>
    </ScreenLayout>
  );
}
