import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CreateValueObject, GetValueObjectById, UpdateValueObject } from "../utils/ValueObjectsDb";

export function ValueObjectForm() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
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
                const data = await GetValueObjectById(id);
                if (data) {
                    setTitle(data.title);
                    setDescription(data.description);
                    setQuantity(data.quantity.toString());
                    setValue(data.value.toString());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function saveValueObject() {
        if (title === '' || description === '' || quantity === '' || value === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            if (idInt) {
                await UpdateValueObject(idInt, title, description, quantity, value);
                Alert.alert('Objeto de valor actualizado!');
            } else {
                await CreateValueObject(title, description, quantity, value);
                Alert.alert('Objeto de valor creado!');
            }
            router.navigate('/');
        } catch (error) {
            console.error('Error al guardar el objeto de valor:', error);
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
                    placeholder="Descripción"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
                <View className='p-1 w-1/2 my-2 '>
                    <TextInput
                        className='text-center text-2xl border-cyan-700 border rounded-full'
                        keyboardType="number-pad"
                        value={quantity}
                        placeholder="Cantidad"
                        onChangeText={(text) => setQuantity(text)}
                    />
                </View>
                <View className='p-1 w-1/2 my-2 '>
                    <TextInput
                        className='text-center text-2xl border-cyan-700 border rounded-full'
                        keyboardType="number-pad"
                        value={value}
                        placeholder="Valor"
                        onChangeText={(text) => setValue(text)}
                    />
                </View>
            </View>
            <Button className='w-full' title={idInt ? "Update" : "Create"} onPress={saveValueObject} />
            {error && <Text className='text-center text-red-500 mt-10'>{error}</Text>}
        </View>
    );
}
