import {View,Text,Animated,StyleSheet,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import { colors } from '../utils/colors';
import { WelcomeSection } from '../components'

const pages = [
    {
        title:"Welcome To ESTIN announces app",
        text:"",
        Wimage: () => (<Image source={require("../assets/welcome-01.png")} style={styles.welcomeImage}/>)
    },
    {
        title:"Welcome To ESTIN announces app",
        text:"",
        imagesPath:"../assets/welcome-02.png"
    },
    {
        title:"Welcome To ESTIN announces app",
        text:"",
        imagesPath:"../assets/welcome-03.png"
    },
]


const Welcome = () => {
    const [currentPage,setCurrentPage] = useState(0)
    return (
        <View style={styles.container}>
            {/* {
                pages.map((page,index) => (
                    <Animated.View>
                        <Text>{page.title}</Text>
                    </Animated.View>
                ))
            } */}
            <WelcomeSection
                currentPage={currentPage}
                title={pages[currentPage].title}
                index={currentPage}
                imagePath="../assets/welcome-01.png"
                text={pages[currentPage].text}
                Wimage = {pages[currentPage].Wimage}
            />

            <View style={styles.controller}>
                {pages.map((page,index) => (
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
        flexDirection: 'row',
    }
})

export default Welcome;