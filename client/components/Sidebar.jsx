import React,{useState,useEffect} from "react";
import {View , Text , StyleSheet , TouchableOpacity, ScrollView, Animated} from "react-native";
import { colors } from "../utils/colors";
import { Lost,Found, Shop,Sports,Gaming } from "../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/Ionicons"
import Icon3 from "react-native-vector-icons/MaterialIcons"
import state from "../state";
import { useSnapshot } from "valtio";
import { Link } from "expo-router"
import { getUserRooms } from "../asyncStorage/rooms";
import { deleteUserData } from "../asyncStorage/user";
import { useRouter } from "expo-router";


const Sidebar = () => {
    const router = useRouter()
    const snap = useSnapshot(state)
    const value = useState(new Animated.Value(-400))[0]
    const toggleSidebar = () => {
        Animated.spring(value, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }
    const hideSidebar = () => {
        Animated.spring(value, {
            toValue: -400,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        if(snap.isSidebarShown){
            toggleSidebar()
        }else{
            hideSidebar()
        }
    },[snap.isSidebarShown])

    const handlePress = () => {
        state.isSidebarShown = false
    }

    const getRooms = async () => {
        const rooms = await getUserRooms()
        if(rooms){
            setDefaultRooms(rooms.filter(room => room.isGeneral))
            setOtherRooms(rooms.filter(room => !room.isGeneral && !room.isPending))
        }
    }
    const [defaultRooms,setDefaultRooms] = useState([])
    const [otherRooms,setOtherRooms] = useState([])

    useEffect(() => {
        getRooms()
    },[])

    const logout = async () => {
        await deleteUserData()
        state.token = null
        router.replace("/login")
    }

    return(
        <Animated.ScrollView
        style={{...styles.container,left:-20,transform:[{translateX:value}]}}
        >
            <View style={{
                width:"100%",
                height:"auto",
                flexDirection:"column",
                gap:20,
                marginBottom:200,
            }}>
                <View
                style={styles.rooms}
                >
                    <Text
                    style={styles.title}
                    >
                        Default rooms:
                    </Text>
                    <View
                    style = {styles.roomsContainer}
                    >
                    {defaultRooms && defaultRooms?.map((room,index) => (
                        <Link href={`/rooms/${room._id}`} key={index} onPress={handlePress}>
                            <View style={styles.roomContainer}>
                                {/* <IconContainer Icon={room.icon} isNotified={room.isNotified}/> */}
                                <Text 
                                style={{
                                    ...styles.roomTitle,
                                    color:room.isNotified ? colors.lentils_orange : colors.dark_blue,
                                    fontWeight:room.isCurrent ? "900" : "500",
                                }}
                                >
                                    {room.name}
                                </Text>
                                {room.isNotified && (
                                    <View 
                                    style={{
                                        width:7,
                                        height:7,
                                        backgroundColor:colors.lentils_orange,
                                        borderRadius:50,
                                        marginLeft:"auto",
                                    }}></View>
                                )}
                            </View>
                        </Link>
                    ))}
                    <Link href="myDMs" onPress={handlePress}>
                            <View style={styles.roomContainer}>
                                {/* <IconContainer Icon={() => <Icon name="user-alt" size={20} color="white"/>} isNotified={true}/> */}
                                <Text 
                                style={{
                                    ...styles.roomTitle,
                                    color:true ? colors.lentils_orange : colors.dark_blue,
                                    fontWeight:true ? "900" : "500",
                                }}
                                >
                                    My DMs
                                </Text>
                                {true && (
                                    <View 
                                    style={{
                                        width:7,
                                        height:7,
                                        backgroundColor:colors.lentils_orange,
                                        borderRadius:50,
                                        marginLeft:"auto",
                                    }}></View>
                                )}
                            </View>
                        </Link>
                    </View>
                </View>

                <View style={styles.separator}></View>

                <View
                style={styles.rooms}
                >
                    <Text
                    style={styles.title}
                    >
                        Other rooms:
                    </Text>
                    <View
                    style = {styles.roomsContainer}
                    >
                    {otherRooms && otherRooms?.map((room,index) => (
                        <Link key={index} href={`/rooms/${room._id}`} onPress={handlePress}>
                        <View style={styles.roomContainer}>
                            {/* <IconContainer Icon={room.icon} isNotified={room.isNotified}/> */}
                            <Text 
                            style={{
                                ...styles.roomTitle,
                                color:room.isNotified ? colors.lentils_orange : colors.dark_blue,
                                fontWeight:room.isCurrent ? "900" : "500",
                            }}
                            >
                                {room.name}
                            </Text>
                            {room.isNotified && (
                                <View 
                                style={{
                                    width:7,
                                    height:7,
                                    backgroundColor:colors.lentils_orange,
                                    borderRadius:50,
                                    marginLeft:"auto",
                                }}></View>
                            )}
                        </View>
                    </Link>
                    ))}
                    </View>
                </View>
                <Link href="/addRoom" onPress={handlePress}>
                    <View
                    style={styles.addRoomContainer}
                    >
                        <Icon name="plus" color="white" size={15}/>
                        <Text style={{color:"white", fontWeight:"800", fontSize:14}}>
                            Create my own room ...
                        </Text>
                    </View>
                </Link>

            </View>
            <View
            style={styles.footer}
            >
                <Link
                href="/settings"
                onPress={handlePress}
                >
                    <Icon2 name="settings-sharp" color={colors.dark_blue} size={35}/>
                </Link>
                <Link
                href="/login"
                onPress={() => {
                    handlePress()
                    logout()
                }}
                >
                    <Icon3 name="logout" color={colors.dark_blue} size={35}/>
                </Link>
            </View>

        </Animated.ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:"90%",
        paddingLeft:30,
        height:"auto",
        top:0,
        bottom:0,
        zIndex:50,
        backgroundColor:colors.light_blue,
        padding:20,
        gap:20,
        overflow:"scroll",
    },
    rooms:{
        width:"100%",
        flexDirection:"column",
        gap:20,
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        color:colors.dark_blue,
    },
    roomsContainer:{
        width:"100%",
        flexDirection:"column",
        gap:10,
        paddingLeft:15,
    },
    roomContainer: {
        width:"100%",
        flexDirection:"row",
        gap:40,
        alignItems:"center",

    },
    roomTitle: {
        fontSize:16,
    },
    separator:{
        width:"100%",
        height:2,
        backgroundColor:colors.dark_blue,
    },
    addRoomContainer: {
        width:250,
        marginTop:20,
        backgroundColor:colors.medium_blue,
        paddingHorizontal:10,
        paddingVertical:15,
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        borderRadius:20,
    },
    footer:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        position : "absolute",
        bottom:0,
        width:"100%",
        height:200,
        gap:15
    }
})


export default Sidebar