import {View,StyleSheet} from 'react-native';
import React from 'react';
import { WelcomeSection } from '../components'

const Welcome = () => {
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