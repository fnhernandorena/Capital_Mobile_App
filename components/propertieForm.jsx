import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";
import { CreatePropertie, GetPropertyById } from "../utils/CapitalDb";

export function PropertieForm() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [address, setAddress] = useState('');
    const [rooms, setRooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [garageCapacity, setGarageCapacity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getOldData(2);
    }, []);

    async function getOldData(id) {
        if (id) {
            try {
                const data = await GetPropertyById(id);
                console.log(data);	
                if (data) {
                    setTitle(data.title);
                    setValue(data.value);
                    setAddress(data.address);
                    setRooms(data.rooms);
                    setBathrooms(data.bathrooms);
                    setGarageCapacity(data.garage_capacity);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function savePropertie() {
        if (title === '' || value === '' || address === '' || rooms === '' || bathrooms === '' || garageCapacity === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            await CreatePropertie(title, value, address, rooms, bathrooms, garageCapacity);
            Alert.alert('Propiedad creada!');
            router.navigate('/');
        } catch (error) {
            console.error('Error al crear la propiedad:', error);
        }
    }

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View>
            <TextInput
                placeholder="Título"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <TextInput
                keyboardType="number-pad"
                value={value}
                placeholder="Valor"
                onChangeText={(text) => setValue(text)}
            />
            <TextInput
                placeholder="Dirección"
                onChangeText={(text) => setAddress(text)}
                value={address}
            />
            <TextInput
                keyboardType="number-pad"
                value={rooms}
                placeholder="Habitaciones"
                onChangeText={(text) => setRooms(text)}
            />
            <TextInput
                keyboardType="number-pad"
                value={bathrooms}
                placeholder="Baños"
                onChangeText={(text) => setBathrooms(text)}
            />
            <TextInput
                keyboardType="number-pad"
                value={garageCapacity}
                placeholder="Capacidad de Garaje"
                onChangeText={(text) => setGarageCapacity(text)}
            />
            <Button title="Guardar propiedad" onPress={savePropertie} />
            {error && <Text>{error}</Text>}
        </View>
    );
}
