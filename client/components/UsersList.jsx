import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    Animated, 
    TouchableOpacity, 
    Text, 
    FlatList,
    Alert
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from "../utils/colors";
import SendMessageInput from "./SendMessageInput";
import state from "../state";


const UsersList = ({ isUsersListToggled, setIsUsersListToggled, usersList, roomName}) => {

    const value = useState(new Animated.Value(800))[0];
    const actionsFade = useState(new Animated.Value(0))[0];
    const [selectedUsers,setSelectedUsers] = useState([]);

    const showAlert = () => {
        Alert.alert(
          'Alert',
          'Do you realy want to delete this user from this room',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      };

    useEffect(() => {
        setSelectedUsers([]);
    }, [roomName])

    const toggleUsersList = () => {
        Animated.spring(value,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    };
    const toggleUsersListBack = () => {
        Animated.spring(value,{
            toValue: 800,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        if (isUsersListToggled) {
            toggleUsersList();
        } else {
            toggleUsersListBack();
        }
    
    }, [isUsersListToggled])


    const fadeAcitonsIn = () => {
        Animated.timing(actionsFade, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }
    const fadeAcitonsOut = () => {
        Animated.timing(actionsFade, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        if (selectedUsers.length > 0) {
            fadeAcitonsIn();
        } else {
            fadeAcitonsOut();
        }
    }, [selectedUsers])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            transform: [
                {
                    translateY: value
                }
            ],
            padding:20,
        },
        titleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        actionsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            opacity: actionsFade,
            transform: [
                {
                    translateX: actionsFade.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,20]
                    })
                }
            ],
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height:50
        }
    })
    
    return (
        <Animated.View style={styles.container}>
            <TouchableOpacity onPress={() => setIsUsersListToggled(false)}>
                <Icon name="arrowleft" size={24} color={colors.dark_blue} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.dark_blue}}>
                    {roomName} users list
                </Text>
            </View>
            <Animated.View style={styles.actionsContainer}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:25}}>
                        <TouchableOpacity style={{flexDirection:"row", gap:5}} onPress={() => state.isInputShown = true}>
                            <Text style={{color:colors.dark_blue, fontWeight:"500"}}>Send message</Text>
                            <Icon name="message1" size={20} color={colors.dark_blue} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:"row", gap:5}} onPress={showAlert}>
                            <Text style={{color:"red", fontWeight:"500"}}>Delete</Text>
                            <Icon name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            <FlatList 
                data={usersList}
                keyExtractor={(item) => item.id}
                renderItem = {({item}) => {
                    const isSelected = Boolean(selectedUsers.find((user) => user.id === item.id));
                    return (
                        <Animated.View 
                        // style={{transform:[{translateX: actionsFade*20}]}}
                        >
                            <TouchableOpacity style={{flexDirection:"row", 
                            alignItems:"center",gap:10, marginTop:10, width:"100%", backgroundColor:isSelected ? colors.light_blue : "white"}} 
                            onPress={() => {
                                if (isSelected) {
                                    setSelectedUsers(selectedUsers.filter((user) => user.id !== item.id));
                                    return;
                                }else{
                                    setSelectedUsers([...selectedUsers,item])
                                }
                            }}>
                                <View stlye={{width:"25%"}}>
                                    <View style={{width: 50, height: 50, borderRadius: 50, backgroundColor:colors.light_blue, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: colors.dark_blue, fontWeight: 'bold', fontSize: 18}}>
                                            {item.name[0]}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", width:"75%", alignItems:"center", justifyContent:"space-between"}}>
                                    <Text style={{color: colors.dark_blue, fontWeight: 'bold', fontSize: 16}}>
                                        {item.name}
                                    </Text>
                                    {isSelected && (
                                        <Icon name="checkcircle" size={16} color={colors.lentils_orange}/>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }}
            />
            <SendMessageInput />
        </Animated.View>
    )
};


export default UsersList;