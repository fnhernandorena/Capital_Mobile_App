import { Text, Pressable, ScrollView, View, Button, Alert } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { GetProperties, StartDB, DeleteProperty } from "../../utils/CapitalDb";

export default function Index() {
    const [properties, setProperties] = useState(null);

    async function deletePropertie(id){
        Alert.alert(
            'Delete confirmation',
            'Are you sure you want to delete this propertie?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: async () => {
                    await DeleteProperty(id) 
                    const prop = await GetProperties()
                    setProperties(prop); 
                }},
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
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : properties.length === 0 ? (
                <View>
                    <Text>No properties here!</Text>
                </View>
            ) : (
                <ScrollView>
                    {properties.map((propertie) => (
                        <View key={propertie.id}>
                            <Text>{propertie.title}</Text>
                            <Text>Value: {propertie.value}</Text>
                            <Button title="Edit" onPress={()=>deletePropertie(propertie.id)}/>
                            <Button title="Delete" onPress={()=>deletePropertie(propertie.id)}/>
                        </View>
                    ))}
                </ScrollView>
            )}

            <Link asChild href='/createPropertie'>
                <Pressable className='bg-gray-500/30 items-center flex p-1 rounded-3xl mb-1'>
                    <FontAwesome name="plus-circle" size={24} color="black" />  
                </Pressable>
            </Link>
        </ScreenLayout>
    );
}
