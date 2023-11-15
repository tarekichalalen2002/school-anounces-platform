import React,{useState,useEffect} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import { colors } from "../utils/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSnapshot } from "valtio";
import state  from "../state";


const SendMesssageButton = ({onPress}) => {
    const [isTextShown, setIsTextShown] = useState(true);
    const snap = useSnapshot(state)
    // console.log(snap.messagesListHeight-snap.scollMessagesList > 50)
    const value = useState(new Animated.Value(200))[0]
    const hideText = () => {
        Animated.timing(value,{
            toValue:50,
            duration:200,
            useNativeDriver:false,
        }).start()
    }
    const toggleText = () => {
        Animated.timing(value,{
            toValue:200,
            duration:200,
            useNativeDriver:false,
        }).start()
    }
    useEffect(() => {
        if(snap.messagesListHeight-snap.scollMessagesList > 50){
            hideText()
            setIsTextShown(false)
        }else{
            toggleText()
            setTimeout(() => {
                setIsTextShown(true)
            }, 200);
        }
    },[snap.messagesListHeight-snap.scollMessagesList > 50])

    const styles = StyleSheet.create({
        container: {
            width: value,
            height: 50,
            position: "absolute",
            backgroundColor: colors.dark_blue,
            borderRadius: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            bottom: 50,
            right: 10,
            gap: 10,
            elevation: 2,
            zIndex:10,
        },
        text: {
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
        }
    })

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View
            style={styles.container}
            >
                <Icon 
                name="pen"
                size={15}
                color="white"
                />
                {
                    isTextShown && <Text style={styles.text}>Send new message</Text>
                }
            </Animated.View>
        </TouchableOpacity>
    )
};



export default SendMesssageButton;