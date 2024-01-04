import {View,StyleSheet} from 'react-native';
import React from 'react';
import { WelcomeSection } from '../components'
import * as SecureStore from "expo-secure-store";
import {useRouter} from 'expo-router';
import {useEffect} from 'react';

const Welcome = () => {
    const router = useRouter();
    const checkIfVisted = async () => {
        try {
            const jsonValue = await SecureStore.getItemAsync("visited");
            return jsonValue;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(checkIfVisted()){
            router.replace("/login")
        }
    },[])
    return (
        <View style={styles.container}>
            <WelcomeSection/>
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
    
})

export default Welcome;