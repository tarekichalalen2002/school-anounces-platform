import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { colors } from '../utils/colors';
import { Link } from 'expo-router';
import  Icon  from 'react-native-vector-icons/FontAwesome5';

const Help = () => {
    const [questoion, setQuestion] = useState('');
    return (
        <View style={styles.container}>
            <Link href="/rooms/1"
                style={{ position: 'absolute', top: 20, left: 30, zIndex: 10 }}
            >
                <Icon name='arrow-left' size={22} color={colors.dark_blue}/>
            </Link>
            <Text style={styles.title}>Ask our team for help!</Text>
            <TextInput 
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setQuestion(text)}
                value={questoion}
                placeholder="Type your question here ..."
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{backgroundColor:colors.dark_blue, paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
                    <Text style={{fontWeight:"700", color:"white", fontSize:16}}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image 
                    source={require('../assets/help.png')}
                    style={{width: 200, height: 200}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70,
        position: 'relative',
        flexDirection: 'column',
        gap: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:colors.dark_blue
    },
    input: {
        textAlignVertical: 'bottom',
        lineHeight: 20,
        width: 300, 
        marginBottom: 20, 
        padding: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: colors.dark_blue,
        fontSize: 16,
    },
    buttonContainer:{
        alignContent:"center",
        justifyContent:"center",
        paddingVertical: 10,
    }
})

export default Help;