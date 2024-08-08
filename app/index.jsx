import { Text, Pressable, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScreenLayout } from "../components/ScreenLayout";

export default function Index(){
    return(
        <ScreenLayout >
         <ScrollView>
            <Text>Hello World!</Text>
            <Text>This is the index!</Text>
         </ScrollView>
            <Pressable className='bg-gray-500/30 items-center flex p-1 rounded-3xl mb-1'>
            <FontAwesome name="plus-circle" size={24} color="black" />  
            </Pressable>
        </ScreenLayout>
    )
}