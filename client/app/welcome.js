import {View,Text,Animated,StyleSheet,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import { colors } from '../utils/colors';


const Welcome = () => {
    const [currentPage,setCurrentPage] = useState(0)
    return (
        <View style={styles.container}>
            <Image source={require("../assets/welcome-01.png")} style={styles.welcomeImage} />

            <View style={styles.controller}>
                <Text style={{color:colors.primary,fontSize:20,fontWeight:'bold'}}>Welcome to</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'
    },
    welcomeImage: {
        width: 300,
        height: 200,
    },
    controller: {
        position: 'absolute',
        bottom: 120,
    }
})

export default Welcome;