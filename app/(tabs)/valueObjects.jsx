import { Text, Pressable, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScreenLayout } from "../../components/ScreenLayout";
import { Link } from "expo-router";

export default function ValueObjects() {
  return (
    
    <ScreenLayout >
    <ScrollView>
       <Text>Hello Value objects!</Text>
       <Text>This is the index!</Text>
    </ScrollView>
    <Link asChild href='/' >
       <Pressable className='bg-gray-500/30 items-center flex p-1 rounded-3xl mb-1'>
       <FontAwesome name="plus-circle" size={24} color="black" />  
       </Pressable></Link>
   </ScreenLayout>
  );
}
