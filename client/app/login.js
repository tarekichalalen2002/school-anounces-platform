import { View,Text,StyleSheet,Image,TouchableOpacity, TextInput} from "react-native";
import { colors } from "../utils/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Octicons";
import { useRouter } from 'expo-router';
import { OrdinaryLoading } from "../components";
import { getUserData, saveUserData,deleteUserData } from "../asyncStorage/user";
import state from "../state";

// 192.168.1.71
// t_ichalalen@estin.dz

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetchError , setFetchError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [started, setStarted] = useState(false);

    const setVisited = async () => {
        try {
            await SecureStore.setItemAsync("visited", JSON.stringify(true));
        } catch (e) {
            console.log(e);
        }
    }

    const login = async () => {
        try{
            const response = await fetch("http://192.168.1.71:3000/api/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            if (response.ok) {
                await saveUserData(data)
                state.token = data.token
                setIsLoading(false)
                await setVisited()
                router.replace("/roomsLoading")
            } else {
                setIsLoading(false)
                setFetchError(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(started){
            if (email.length === 0){
                setEmailError("Email is required")
            } else {
                setEmailError("")
                if (!email.endsWith("@estin.dz")) {
                    setEmailError("Invalid email domain")
                }
            }
            if (password.length === 0){
                setPasswordError("Password is required")
            } else {
                setPasswordError("")
            }
        }
    }, [email,password])

    const getToken = async () => {
        try{
            const user = await getUserData()
            if (user){
                return user.token
            }
            return null
        }
        catch(error){
            console.log("the error we got :",error)
        }
    }
    
    useEffect(() => {
        getToken().then((token) => {
            if (token){
                state.token = token
                router.replace("/roomsLoading")
            }
        })
        
    },[])

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo-estin.png")} style={styles.logo}/>    
            <View style = {{
                flexDirection:"column",
                alignItems:"center",
                gap:35,
                paddingTop:20,
                marginTop:20,
            }}>
                <View style={{
                    position:"relative",
                }}>
                    <TextInput 
                        style={{...styles.input,borderColor:emailError ?  "red" : colors.medium_blue}}
                        placeholder="a_example@estin.dz"
                        onChangeText={(text) =>{
                            setEmail(text)
                            setFetchError('')
                        }}
                        value={email}
                    />
                    {emailError && 
                        <Text style={styles.error}>
                            {emailError}
                        </Text>
                    }
                    <Icon 
                        name="email-outline"
                        size={20}
                        color={colors.medium_blue}
                        style={styles.inputIcon}
                    />
                </View>
                <View style={{
                    position:"relative",
                }}>
                    <TextInput 
                        style={{...styles.input,borderColor:passwordError ?  "red" : colors.medium_blue}}
                        placeholder="your password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setPassword(text)
                            setStarted(true)
                            setFetchError('')
                        }}
                        value={password}
                    />
                    {passwordError && 
                        <Text style={styles.error}>
                            {passwordError}
                        </Text>
                    }
                    <Text style={styles.fetchError}>
                        {fetchError}
                    </Text>
                    <View
                    style={{
                        position:"absolute",
                        bottom:-30,
                        width:240,
                        alignItems:"center",
                        justifyContent:"center",
                    }}
                    >
                        {isLoading && <OrdinaryLoading color={colors.dark_blue} size={20} />}
                    </View>
                    <Icon2
                        name="key"
                        size={20}
                        color={colors.medium_blue}
                        style={styles.inputIcon}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton}
                    onPress={async () => {
                        if (!emailError && !passwordError) {
                            setIsLoading(true)
                            setStarted(true)
                            await login()
                        }
                    }}
                >
                    <View 
                    style={{...styles.buttonContainer,backgroundColor: (!emailError & !passwordError) ? colors.dark_blue : colors.medium_blue}}
                    >
                        <Text style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "600",
                        }}>
                            Login
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        marginTop:100,
    },
    loginButton:{
        marginTop: 20,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 1,
    },
    buttonText: {
        color: colors.dark_blue,
        fontSize: 15,
        fontWeight: "600",
    },
    input:{
        width:240,
        height:40,
        borderRadius:10,
        paddingHorizontal:10,
        borderWidth:2,
        paddingVertical:5,
        paddingHorizontal:15
    },
    inputIcon:{
        position:"absolute",
        right:10,
        top:10,
    },
    error:{
        color:"red",
        position:"absolute",
        bottom:-20,
        left:5,
        fontSize:12,
    },
    fetchError:{
        color:"red",
        position:"absolute",
        bottom:-30,
        left:5,
        fontSize:12,
        textAlign:"center",
        width:240,
    }
})
export default Login