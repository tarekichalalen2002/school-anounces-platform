import {View, Animated, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../utils/colors';

const WelcomeSection = ({title,text,Wimage,index,currentPage}) => {
    // console.log(imagePath)
    const value = useState(new Animated.Value(0))[0];
    const slideRight = () => {
        Animated.timing(value,{
            toValue:-400,
            duration:500,
            useNativeDriver:true,
        }).start();
    }


    const styles = StyleSheet.create({
        container:{
            position:'absolute',
            alignItems:'center',
            top:100,
        },
        welcome01:{
            transform:[{translateX:value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'70%',
            gap:40,
        },
        welcome02:{
            transform:[{translateX:400+value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'70%',
            gap:40,
        },
        welcome03:{
            transform:[{translateX:800+value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'70%',
            gap:40,
        },
        title:{
            fontSize:20,
            textAlign:'center',
            fontWeight:'bold',
            color:colors.dark_blue,
        },
        text:{
            fontSize:15,
            textAlign:"center",
            color: colors.dark_blue,
            fontWeight:"500"
        }
    })
    return (
        <Animated.View style={styles.container}>
            <Animated.View style={styles.welcome01}>
                <Text
                style={styles.title}
                >{title}</Text>
                <Wimage />
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
            <Animated.View style={styles.welcome02}>
                <Text
                style={styles.title}
                >{title}</Text>
                <Wimage />
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
            <Animated.View style={styles.welcome03}>
                <Text
                style={styles.title}
                >{title}</Text>
                <Wimage />
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        </Animated.View>
    )
}

export default WelcomeSection;