import { View,Text,StyleSheet,Image,TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import { colors } from "../utils/colors";
import {Google} from "../assets/icons";

const Login = () => {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo-estin.png")} style={styles.logo}/>    
            <TouchableOpacity style={styles.loginButton}>
                <Link href="/lostObjects" >
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Continue with Google @estin.dz </Text>
                        <Google />
                    </View>
                </Link>
            </TouchableOpacity>
            <Image source={require("../assets/group-chat-01.png")} style={styles.illustration}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        flexDirection:"column",
        paddingTop:20,
    },
    logo:{
        width:90,
        height:33,
    },
    illustration:{
        width:300,
        height:150,
        position:"absolute",
        bottom:250,
    },
    loginButton:{
        marginTop: 100,
    },
    buttonContainer: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        elevation: 15,
        gap: 10,
    },
    buttonText: {
        color: colors.dark_blue,
        fontSize: 15,
        fontWeight: "600",
    }
})
export default Login