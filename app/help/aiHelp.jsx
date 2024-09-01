import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AiHelp() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const genAI = new GoogleGenerativeAI('AIzaSyBLz3eMCnW4Z5NiVncthMXkPeIB-MJVAKM');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        setInput('');

        try {
            const aiResponse = await model.generateContent(input)

            const aiMessage = { sender: 'ai', text: aiResponse.response.text() };
            setMessages([...messages, userMessage, aiMessage]);

        } catch (error) {
            const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong.' };
            setMessages([...messages, userMessage, errorMessage]);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "AI Assistant",
                    headerRight: () => {}
                }}
            />

            <ScrollView style={styles.chatContainer}>
                {messages.map((message, index) => (
                    <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                className='p-2 mb-4'
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your message..."
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    chatContainer: {
        flex: 1,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    messageText: {
        fontSize: 16,
    },
});
