import React,{useState} from "react"
import { View,Text,StyleSheet,Image } from "react-native"
import { Header } from "../components"
import { Sidebar,DarknessLayer } from "../components"
import state from "../state"
import { useSnapshot } from "valtio"
import { colors } from "../utils/colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import {ActivationButton} from "../components"

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
        gap: 20,
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
    }
})
export default Settings