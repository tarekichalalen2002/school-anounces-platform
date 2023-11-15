import React from "react";
import {Text , View , StyleSheet} from "react-native";
import { colors } from "../utils/colors";

const DateSeparator = ({date}) => {
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
                <Text style={styles.date}>{date}</Text>
            <View style={styles.line}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width: "100%",
        // backgroundColor: "#E5E5E5",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    date:{
        fontSize: 10,
        color: colors.dark_blue,
    },
    line:{
        width:"36%",
        height: 1,
        backgroundColor: colors.dark_blue,
    }
})

export default DateSeparator;