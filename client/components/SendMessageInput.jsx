import { useEffect, useState } from "react";
import {Text, View, StyleSheet, Animated, TouchableOpacity, TextInput} from "react-native"
import { colors } from "../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import state from "../state";
import { useSnapshot } from "valtio";
const SendMessageInput = () => {
    const snap = useSnapshot(state)
    const value = useState(new Animated.Value(800))[0]
    const showInput = () => {
        Animated.spring(value,{
            toValue:0,
            duration:400,
            useNativeDriver:true,
        }).start()
    }
    const hideInput = () => {
        Animated.spring(value,{
            toValue:800,
            duration:400,
            useNativeDriver:true,
        }).start()
    }
    useEffect(() => {
        if(snap.isInputShown){
            showInput()
        }else{
            hideInput()
        }
    },[snap.isInputShown])
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            position: "absolute",
            backgroundColor: "white",
            bottom:0,
            transform: [{translateY:value}],
            left: 0,
            right: 0,
            display: snap.isInputShown ? "flex" : "none",
            flexDirection: "column",
        },
        header: {
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            elevation: 2,
        },
        headerText:{
            fontSize: 20,
            fontWeight: "medium",
            color: colors.dark_blue,
        },
        subHeader: {
            height: 50,
            display: "flex",
            gap: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
        },
        messageForm:{
            height: "100%",
            backgroundColor: "white",
            padding: 20,
            flexDirection: "column",
            gap:20
        },
        titleInputContainer:{
            width: "100%",
            height: 50,
            borderBottomWidth:2,
            borderBottomColor:colors.light_blue
        },
        titleInput:{
            width: "100%",
            height: 50,
            fontSize: 15,
            padding: 10,
        },
        messageInputContainer:{
            width: "100%",
            height: 50,
        },
        messageInput:{
            width: "100%",
            height: 50,
            fontSize: 15,
            padding: 10,
        }
    })
    return (
        <Animated.View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => state.isInputShown = false}>
                    <Icon name="arrowleft" size={24} color={colors.dark_blue} />
                </TouchableOpacity>
                <Text
                style={styles.headerText}
                >
                    New message
                </Text>
                <View
                style={styles.subHeader}
                >
                    <TouchableOpacity>
                        <Icon2 name="camera" size={22} color={colors.dark_blue} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon3 name="send" size={22} color={colors.dark_blue} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.messageForm}>
                <View style={styles.titleInputContainer}>
                    <TextInput
                    style={styles.titleInput}
                    placeholder="Title ..."
                    />
                </View>
                <View style={styles.messageInputContainer}>
                    <TextInput
                    style={styles.messageInput}
                    placeholder="Write your message here ..."
                    />
                </View>
            </View>
        </Animated.View>
    )
}

export default SendMessageInput