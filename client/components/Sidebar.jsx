import {View , Text , StyleSheet , TouchableOpacity , TextInput , Animated} from "react-native";
import { colors } from "../utils/colors";
const Sidebar = () => {
    return(
        <View
        style={styles.container}
        >
            <View
            style={styles.defaultRooms}
            >
                <Text
                style={styles.title}
                >
                    Default rooms:
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:300,
        top:0,
        bottom:0,
        left:0,
        zIndex:50,
        backgroundColor:colors.light_blue,
        padding:20,
    },
    defaultRooms:{
        width:"100%",
        flexDirection:"column",
        gap:10,
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        color:colors.dark_blue,
        
    }
    
})


export default Sidebar