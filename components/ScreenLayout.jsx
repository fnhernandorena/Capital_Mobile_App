import { View } from "react-native";

export function ScreenLayout({children}){
return (
    <View
    className='flex-1 bg-gray pt-4 px-1'
    >
        {children}
    </View>
)
}