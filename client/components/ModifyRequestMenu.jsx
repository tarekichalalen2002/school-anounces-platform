import { View, TouchableOpacity, Text, Animated, Touchable } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { colors } from "../utils/colors";


const ModifyRequestMenu = ({selectedRoom,close}) => {
    const value = useState(new Animated.Value(800))[0]
    const show = () => {
        Animated.spring(value,{
            toValue:0,
            duration:400,
            useNativeDriver:true,
        }).start()
    }
    const hide = () => {
        Animated.spring(value,{
            toValue:800,
            duration:400,
            useNativeDriver:true,
        }).start()
    }
    useEffect(() => {
        if(selectedRoom){
            show()
        }else{
            hide()
        }
    },[selectedRoom])

    
    return (
        <Animated.View style={{
            // height: "40%",
            width: "100%",
            position: "absolute",
            bottom:20,
            transform: [{translateY:value}],
            flexDirection: "column",
            alignItems: "center",
            zIndex: 90,
            gap: 10,
        }}>
            <TouchableOpacity style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                elevation: 2,
            }}>
                <View style={{
                    width: "90%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 5,
                }}>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.lentils_orange,
                        padding: 10,
                    }}
                    >Change room title</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                elevation: 2,
            }}>
                <View style={{
                    width: "90%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 5,
                }}>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.lentils_orange,
                        padding: 10,
                    }}
                    >Change room description</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                elevation: 2,
            }}>
                <View style={{
                    width: "90%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 5,
                }}>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.lentils_orange,
                        padding: 10,
                    }}
                    >Invitations</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                elevation: 2,
            }}
            onPress={() => close()}
            >
                <View style={{
                    width: "90%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius: 5,
                }}>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.lentils_orange,
                        padding: 10,
                    }}
                    >Cancel</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ModifyRequestMenu