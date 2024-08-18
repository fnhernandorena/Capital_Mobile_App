import { useState } from "react";
import { View , Text, TextInput, Button, Alert} from "react-native";
import { router, Stack } from "expo-router";
import { CreatePropertie } from "../utils/CapitalDb";

export function PropertieForm(){
   
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [address, setAddress] = useState('');
    const [rooms, setRooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [garageCapacity, setGarageCapacity] = useState('');
    const [error, setError] = useState(null);

async function createPropertie(){
    if (title == '') {
        setError('Title is required');
        return;
    }
    await CreatePropertie(title, value, address, rooms, bathrooms, garageCapacity)
    Alert.alert('Propertie created!')
    router.navigate('/')
}

    return(
        <View>
            <TextInput
            placeholder="Enter title"
            onChangeText={(text)=> setTitle(text)}
            value={title}
            />
            <TextInput
            keyboardType="numeric"
            value={value}
            placeholder="Enter value"
            onChangeText={(text)=> setValue(text)}
            />
            <Button title="Create capital" onPress={createPropertie}/>
            {error && <Text>{error}</Text>}
        </View>
    )
}