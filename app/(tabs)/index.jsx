import { Text, Pressable, ScrollView, View, Button, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  GetProperties,
  StartDB,
  DeleteProperty,
} from "../../utils/PropertiesDb";

export default function Index() {
  const [properties, setProperties] = useState(null);

  async function deletePropertie(id) {
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to delete this propertie?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await DeleteProperty(id);
            const prop = await GetProperties();
            setProperties(prop);
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function startDb() {
      await StartDB();
      const prop = await GetProperties();
      setProperties(prop);
    }
    startDb();
  }, []);

  return (
    <ScreenLayout>
      {properties === null ? (
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      ) : properties.length === 0 ? (
        <ScrollView>
          <Text>No properties here!</Text>
        </ScrollView>
      ) : (
        <ScrollView>
          {properties.map((propertie) => (
            <View className="flex" key={propertie.id}>
                <Text className="text-3xl">{propertie.title}</Text>
                <Text className="text-zinc-600">{propertie.address}</Text>
              <View className="flex w-full flex-row flex-wrap">
                <Text className="w-1/2">Value: {propertie.value}</Text>
                <Text className="w-1/2">Rooms: {propertie.rooms}</Text>
                <Text className="w-1/2">Bathrooms: {propertie.bathrooms}</Text>
                <Text className="w-1/2">
                  Garage capacity: {propertie.garage_capacity}
                </Text>
              </View>
              <View className="flex flex-row">
              <View className='p-1 w-1/2'>
                <Link
                  href={{
                    pathname: "/properties/[id]",
                    params: { id: propertie.id },
                  }}
                  asChild
                >
                  <Pressable className='bg-yellow-600 flex flex-row items-center p-1 rounded-full justify-center'>
                    <FontAwesome
                      name="pencil-square-o"
                      size={20}
                      color="white"
                    />
                    <Text className='text-white mx-1'>Edit</Text>
                  </Pressable>
                </Link></View>
                <View className='p-1 w-1/2'>
                <Pressable className='bg-red-600 flex flex-row items-center p-1 rounded-full justify-center' onPress={() => deletePropertie(propertie.id)}>
                <FontAwesome name="trash" size={20} color="white" />
                  <Text className='text-white mx-1'>Delete</Text>
                </Pressable></View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <Link asChild href="/properties/createPropertie">
        <Pressable className="bg-green-600 items-center flex p-1 rounded-3xl mb-1">
          <FontAwesome name="plus-circle" size={24} color="white" />
        </Pressable>
      </Link>
    </ScreenLayout>
  );
}
