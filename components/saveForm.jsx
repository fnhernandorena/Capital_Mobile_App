import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CreateSave, GetSaveById, UpdateSave } from "../utils/SavesDb";

export function SaveForm() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [location, setLocation] = useState('');
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
                const data = await GetSaveById(id);
                if (data) {
                    setTitle(data.title);
                    setCurrency(data.currency);
                    setAmount(data.amount.toString());
                    setLocation(data.location);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function saveSave() {
        if (title === '' || currency === '' || amount === '' || location === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            if (idInt) {
                await UpdateSave(idInt, title, currency, amount, location);
                Alert.alert('Save actualizado!');
            } else {
                await CreateSave(title, currency, amount, location);
                Alert.alert('Save creado!');
            }
            router.navigate('/');
        } catch (error) {
            console.error('Error al guardar el save:', error);
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
                    placeholder="Moneda"
                    onChangeText={(text) => setCurrency(text)}
                    value={currency}
                />
                <View className='p-1 w-1/2 my-2 '>
                    <TextInput
                        className='text-center text-2xl border-cyan-700 border rounded-full'
                        keyboardType="number-pad"
                        value={amount}
                        placeholder="Cantidad"
                        onChangeText={(text) => setAmount(text)}
                    />
                </View>
                <View className='p-1 w-full my-2 '>
                    <TextInput
                        className='text-center text-2xl border-cyan-700 border rounded-full'
                        value={location}
                        placeholder="Ubicación"
                        onChangeText={(text) => setLocation(text)}
                    />
                </View>
            </View>
            <Button className='w-full' title={idInt ? "Update" : "Create"} onPress={saveSave} />
            {error && <Text className='text-center text-red-500 mt-10'>{error}</Text>}
        </View>
    );
}
