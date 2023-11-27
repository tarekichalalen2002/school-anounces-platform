import { View,Text } from "react-native";
import {MessagesLoading} from "../components"


const LoadingTest = () => {
    return (
        <View style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
            <MessagesLoading />
        </View>
    )
}

export default LoadingTest