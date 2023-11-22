import React,{useState} from "react"
import { View,Text,StyleSheet,Image } from "react-native"
import { Header } from "../components"
import { Sidebar,DarknessLayer } from "../components"
import state from "../state"
import { useSnapshot } from "valtio"
import { colors } from "../utils/colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import { Link } from "expo-router"
import { ActivationButton } from "../components"

const Settings = () => {
    const snap = useSnapshot(state)
    const [isNotificationEnabled,setIsNotificationEnabled] = useState(true)
    const [isDarkModeEnabled,setIsDarkModeEnabled] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header currentTitle="Settings" isNotified={true}/>
            </View>

            <View style={styles.banner}>
                <Image source={require("../assets/john.jpg")} style={styles.picture}/>
            </View>

            <View style={styles.usernameContainer}>
                <Text style={styles.username}>John Doe</Text>
            </View>

            <View style={styles.settings}>
                <View style={styles.setting}>
                    <View
                    style={styles.iconContainer}
                    >
                        <Icon name="bell" size={20} color={colors.dark_blue}/>
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingText}>Notifications</Text>
                    </View>
                    <View>
                        <ActivationButton onPress={() => setIsNotificationEnabled(!isNotificationEnabled)} isActivated={isNotificationEnabled}/>
                    </View>
                </View>
                <View style={styles.setting}>
                    <View
                    style={styles.iconContainer}
                    >
                        <Icon2 name="moon" color={colors.dark_blue} size={20}/>
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingText}>Dark mode</Text>
                    </View>
                    <View>
                        <ActivationButton onPress={() => setIsDarkModeEnabled(!isDarkModeEnabled)} isActivated={isDarkModeEnabled}/>
                    </View>
                </View>
                <View style={styles.setting}>
                    <View
                    style={styles.iconContainer}
                    >
                        <Icon3 name="users" color={colors.dark_blue} size={20}/>
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingText}>My rooms</Text>
                    </View>
                    <View style={styles.rightChevContainer}>
                        <Icon name="chevron-right" size={12} color={colors.dark_blue}/>
                    </View>
                </View>
                <View style={styles.setting}>
                    <View
                    style={styles.iconContainer}
                    >
                        <Icon2 name="help-circle" color={colors.dark_blue} size={30}/>
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingText}>Help</Text>
                    </View>
                    <View style={styles.rightChevContainer}>
                        <Icon name="chevron-right" size={12} color={colors.dark_blue}/>
                    </View>
                </View>
                <View style={styles.setting}>
                    <View
                    style={styles.iconContainer}
                    >
                        <Link href="/login">
                            <Icon4 name="logout" color={colors.dark_blue} size={30}/>
                        </Link>
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Link href="/login">
                            <Text style={styles.settingText}>Logout</Text>
                        </Link>
                    </View>
                    <View style={styles.rightChevContainer}>
                        <Icon name="chevron-right" size={12} color={colors.dark_blue}/>
                    </View>
                </View>
                {/* <Link
                href="/login"
                >
                    <Icon3 name="logout" color={colors.dark_blue} size={35}/>
                </Link> */}

            </View>
            

            {snap.isSidebarShown && <DarknessLayer/>}
            <Sidebar />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    headerContainer: {
        height: 75,
        zIndex: 1,
    },
    banner:{
        height: 88,
        width: '100%',
        backgroundColor: colors.dark_blue,
        position: 'relative',
    },
    picture: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        bottom: -50,
        left: 30,
        borderWidth: 4,
        borderColor: "white",
    },
    usernameContainer: {
        marginTop: 55,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 40,
        color: colors.dark_blue,
    },
    settings: {
        marginTop: 25,
        flex: 1,
        backgroundColor: colors.light_blue,
        paddingTop: 30,
        paddingLeft: 30,
        flexDirection: 'column',
        gap: 30,
    },

    iconContainer:{
        width: 50,
    },
    setting:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    settingTextContainer:{
        width:200,
    },
    settingText:{
        fontSize: 16,
        color: colors.dark_blue,
        fontWeight: 'bold',
    },
    rightChevContainer:{
        width: 60,
        height:"100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})
export default Settings