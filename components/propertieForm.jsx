import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CreatePropertie, GetPropertyById, UpdateProperty } from "../utils/PropertiesDb";

export function PropertieForm() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [address, setAddress] = useState('');
    const [rooms, setRooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [garageCapacity, setGarageCapacity] = useState('');
    const [error, setError] = useState(null);
    
    const { id } = useLocalSearchParams();
    const idInt = parseInt(id);

    useEffect(() => {
        if (idInt) {
            getOldData(idInt);
        } else {
            setLoading(false);
        }
    }, [idInt]);

    async function getOldData(id) {
        if (id) {
            try {
                const data = await GetPropertyById(id);
                if (data) {
                    setTitle(data.title);
                    setValue(data.value.toString());
                    setAddress(data.address);
                    setRooms(data.rooms.toString());
                    setBathrooms(data.bathrooms.toString());
                    setGarageCapacity(data.garage_capacity.toString());
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
            if (idInt) {
                await UpdateProperty(idInt, title, value, address, rooms, bathrooms, garageCapacity);
                Alert.alert('Propiedad actualizada!');
            } else {
                await CreatePropertie(title, value, address, rooms, bathrooms, garageCapacity);
                Alert.alert('Propiedad creada!');
            }
            router.navigate('/');
        } catch (error) {
            console.error('Error al guardar la propiedad:', error);
        }
    }

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View className='mt-24'>
        <View className='px-2 flex flex-wrap flex-row'>
            <TextInput
            className='w-full text-center my-2 text-2xl border-cyan-700 border rounded-full'
                placeholder="Título"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <TextInput
            className='w-full text-center my-2 text-2xl border-cyan-700 border rounded-full'
                placeholder="Dirección"
                onChangeText={(text) => setAddress(text)}
                value={address}
            /><View className='p-1 w-1/2 my-2 '>
            <TextInput
            className='  text-center text-2xl border-cyan-700 border rounded-full'
                keyboardType="number-pad"
                value={value}
                placeholder="Valor"
                onChangeText={(text) => setValue(text)}
            /></View><View className='p-1 w-1/2 my-2 '>
            <TextInput
            className='text-center text-2xl border-cyan-700 border rounded-full'
                keyboardType="number-pad"
                value={rooms}
                placeholder="Habitaciones"
                onChangeText={(text) => setRooms(text)}
            /></View><View className='p-1 w-1/2 my-2 '>
            <TextInput
            className='text-center text-2xl border-cyan-700 border rounded-full'
                keyboardType="number-pad"
                value={bathrooms}
                placeholder="Baños"
                onChangeText={(text) => setBathrooms(text)}
            /></View><View className='p-1 w-1/2 my-2 '>
            <TextInput
            className='text-center text-2xl border-cyan-700 border rounded-full'
                keyboardType="number-pad"
                value={garageCapacity}
                placeholder="Capacidad de Garaje"
                onChangeText={(text) => setGarageCapacity(text)}
            /></View></View>
            <Button className='w-full' title={idInt ? "Update" : "Create"} onPress={savePropertie} />
            {error && <Text className='text-center text-red-500 mt-10'>{error}</Text>}
        </View>
    );
}
