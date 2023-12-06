import {View, Animated, StyleSheet, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../utils/colors';
import Icon from 'react-native-vector-icons/Entypo'
import {Link} from "expo-router"
const pages = [0,1,2];
const WelcomeSection = () => {
    const [currentPage,setCurrentPage] = useState(0);
    const value = useState(new Animated.Value(0))[0];
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const slideLeft = () => {
        Animated.spring(value,{
            toValue:0,
            duration:500,
            useNativeDriver:true,
        }).start();
    }
    const slideRight = () => {
        Animated.spring(value,{
            toValue:-screenWidth,
            duration:500,
            useNativeDriver:true,
        }).start();
    }
    const slideLeft2 = () => {
        Animated.spring(value,{
            toValue:-screenWidth,
            duration:500,
            useNativeDriver:true,
        }).start();
    }
    const slideRight2 = () => {
        Animated.spring(value,{
            toValue:-2*screenWidth,
            duration:500,
            useNativeDriver:true,
        }).start();
    }

    const styles = StyleSheet.create({
        container:{
            position:'absolute',
            alignItems:'center',
            width:"100%",
            height:"100%",
            top:0,
        },
        welcome01:{
            position:'absolute',
            transform:[{translateX:value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:screenWidth,
            gap:40,
            top:100,
        },
        welcome02:{
            position:'absolute',
            width:screenWidth,
            left:screenWidth,
            transform:[{translateX:value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:40,
            top:100,
        },
        welcome03:{
            position:'absolute',
            width:screenWidth,
            left:2*screenWidth,
            transform:[{translateX:value}],
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:40,
            top:100,
        },
        title:{
            fontSize:20,
            textAlign:'center',
            fontWeight:'bold',
            color:colors.lentils_orange,
        },
        text:{
            fontSize:15,
            textAlign:"center",
            color: colors.dark_blue,
            fontWeight:"500",
            width: 300,
        },
        image: {
            width: 300,
            height: 200,
        },
        controller: {
            position: 'absolute',
            bottom: 170,
            flexDirection: 'row',
        },
        tryIt:{
            backgroundColor:colors.lentils_orange,
            paddingHorizontal:20,
            paddingVertical:10,
            borderRadius:10,
        },
        tryItText:{
            color:"white",
            fontSize:16,
            fontWeight:"600",
        }
    })
    return (
        <View style={styles.container}>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            <Animated.View style={styles.welcome01}>
                <Text
                style={styles.title}
                >Welcome To ESTIN announces app</Text>
                <Image source={require("../assets/welcome-01.png")} style={styles.image}/>
            </Animated.View>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            <Animated.View style={styles.welcome02}>
                <Text
                style={styles.title}
                >Welcome To ESTIN app</Text>
                <Image source={require("../assets/welcome-02.png")} style={styles.image}/>
                <Text style={styles.text}>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                </Text>
            </Animated.View>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            <Animated.View style={styles.welcome03}>
                <Text
                style={styles.title}
                >Welcome To ESTIN app</Text>
                <Image source={require("../assets/welcome-03.png")} style={styles.image}/>
                <Text style={styles.text}>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </Text>
                <Link href="/login" style={styles.tryIt}>
                        <Text style={styles.tryItText}>
                        Try it now !
                        </Text>
                </Link>
            </Animated.View>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            {currentPage < 2 && (
                <TouchableOpacity onPress={() => {
                    if (currentPage == 0){
                        slideRight();
                    }else if (currentPage == 1){
                        slideRight2();
                    }
                    setCurrentPage(currentPage + 1);
                }} style={{position:"absolute",bottom:100,right:20,flexDirection:"row",gap:5,alignItems:"center"}}>
                    <Text style={{fontSize:16,fontWeight:600,color:colors.dark_blue}}>Next</Text>
                    <Icon name="chevron-right" size={20} color={colors.dark_blue}/>
                </TouchableOpacity>
            )}
            {currentPage > 0 && (
                <TouchableOpacity onPress={() => {
                    if (currentPage == 1){
                        slideLeft()
                    }else if(currentPage == 2){
                        slideLeft2();
                    }
                    setCurrentPage(currentPage - 1);
                }} style={{position:"absolute",bottom:100,left:20,flexDirection:"row",gap:5,alignItems:"center"}}>
                    <Icon name="chevron-left" size={20} color={colors.dark_blue}/>
                    <Text style={{fontSize:16,fontWeight:600,color:colors.dark_blue}}>Back</Text>
                </TouchableOpacity>
            )}
            <View style={styles.controller}>
                {pages.map((pages,index) => (
                    <View 
                    style={{
                        width:10,
                        height:10,
                        borderRadius:5,
                        backgroundColor:(index === currentPage) ? colors.dark_blue : colors.medium_blue,
                        margin:5,
                        borderRadius:10
                    }}
                    key={index}
                    />
                ))}
            </View>
        </View>
    )
}

export default WelcomeSection;