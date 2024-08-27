import { Text, Pressable, ScrollView, View, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  GetValueObjects,
  StartDB,
  DeleteValueObject,
} from "../../utils/ValueObjectsDb";

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
                <Text className="text-3xl">{valueObject.title}</Text>
              <Text className="text-xl text-zinc-600">
                Description: {valueObject.description}
              </Text>
              <View className="flex w-full flex-row flex-wrap">
                <Text className="w-1/2 text-xl">Quantity: {valueObject.quantity}</Text>
                <Text className="w-1/2 text-xl">Value: {valueObject.value}</Text>
              </View>
              <View className="flex flex-row">
                <View className="p-1 w-1/2">
                  <Link
                    href={{
                      pathname: "/valueObjects/[id]",
                      params: { id: valueObject.id },
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
                    onPress={() => deleteValueObject(valueObject.id)}
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

      <Link asChild href="/valueObjects/createValueObject">
        <Pressable className="bg-green-600 items-center flex p-1 rounded-3xl mb-1">
          <FontAwesome name="plus-circle" size={24} color="white" />
        </Pressable>
      </Link>
    </ScreenLayout>
  );
}
