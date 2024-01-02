import {Text, View, StyleSheet, TextInput,SafeAreaView,Image, TouchableOpacity, Animated, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Link} from 'expo-router';
import { colors } from '../utils/colors';
import { users } from '../utils/users';
import Icon from "react-native-vector-icons/AntDesign";
import  Icon2  from 'react-native-vector-icons/FontAwesome5';
                

const AddRoom = () => {
    const [studentsListToggled, setStudentsListToggled] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState(users);
    const value = useState(new Animated.Value(800))[0];

    const toggleStudentsList = () => {
        Animated.spring(value, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
    const closeStudentsList = () => {
        Animated.spring(value, {
            toValue: 800,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
    useEffect(() => {
        if(studentsListToggled){
            toggleStudentsList()
        }else{
            closeStudentsList()
        }
    },[studentsListToggled])
    useEffect(() => {
        const results = users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(results);
    },[searchText])
    return (
        <SafeAreaView style={styles.container}>
            <Link href="/rooms/0" style={{position:"absolute",left:20,top:10}}>
                <Icon2 name='arrow-left' size={22} color={colors.dark_blue}/>
            </Link>
            <Text style={styles.title}>
                Create a new room
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Room name:</Text>
                <TextInput 
                    style={styles.nameInput}
                    placeholder="Enter room name ..."
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subject :</Text>
                <TextInput 
                    style={styles.nameInput}
                    placeholder="What is the room about ..."
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description :</Text>
                <TextInput 
                    style={styles.descriptionInput}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Explain why we need this room ..."
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Invite students :</Text>
                <View style={styles.invitationsContainer}>
                    <ScrollView showsVerticalScrollIndicator={true} style={styles.selectedStudents}>
                        {selectedStudents && selectedStudents.map((user) => (
                            <View key={user.id} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: 2,
                                paddingHorizontal: 5,
                            }}>
                                <Text style={{fontWeight:"600"}}>{user.name}</Text>
                                <TouchableOpacity 
                                    onPress={() => setSelectedStudents(selectedStudents.filter((u) => u.id !== user.id))}
                                >
                                    <Icon name="close" size={15} color={colors.lentils_orange}/>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {selectedStudents.length === 0 && (
                            <Text style={{fontWeight:"600"}}>No students selected</Text>
                        )}
                    </ScrollView>
                    <View style={styles.inviteButtonContainer}>
                        <TouchableOpacity style={styles.inviteButton}  onPress={() => setStudentsListToggled(true)}>
                            <Text style={styles.inviteButtonText}>Invite</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Create room</Text>
            </TouchableOpacity>

            <Animated.View style ={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                transform: [{translateY: value}],
                backgroundColor: 'white',
                padding: 20,
            }}>
                <TouchableOpacity onPress={() => setStudentsListToggled(false)}>
                    <Icon name="arrowleft" size={30} color={colors.dark_blue}/>
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputBox}>
                        <TextInput 
                            style={styles.searchInput}
                            placeholder="Search for students ..."
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                        />
                        <Icon name="search1" size={18} color={colors.dark_blue} style={{position: 'absolute', left: 10, top: 10}}/>
                    </View>
                </View>
                {searchResults.length > 0 ? (
                    <FlatList 
                    data={searchResults}
                    style={styles.studentsListContainer}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        const isSelected = Boolean(selectedStudents.find((user) => user.id === item.id));
                        return (
                            <TouchableOpacity onPress={() => {
                                if (isSelected) {
                                    setSelectedStudents(selectedStudents.filter((user) => user.id !== item.id));
                                    return;
                                }else{
                                    setSelectedStudents([...selectedStudents,item])
                                }
                            }}>
                                <View style={styles.user}>
                                    <Image source={require("../assets/john.jpg")} style={styles.userImage}/>
                                    <Text style={styles.username}>{item.name}</Text>
                                    <View style={{...styles.selectIndicator,backgroundColor:isSelected ? colors.dark_blue : "white"}}>
                                        {isSelected && <Icon name="check" size={12} color="white"/>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                ) : (
                    <View style={styles.notFoundContainer}>
                        <Text>No results found</Text>
                    </View>
                )}
            </Animated.View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 25,
        position: 'relative',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.dark_blue,
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'column',
        gap:15
    },
    nameInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '500',
    },
    descriptionInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlignVertical: 'top',
        lineHeight: 20,
    },
    invitationsContainer: {
        // flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    selectedStudents: {
        width: "90%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 70,
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'column',
        gap:7,
    },
    inviteButtonContainer: {
        width: "30%",
    },
    inviteButton: {
        backgroundColor: colors.dark_blue,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inviteButtonText:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 14,
    },
    searchContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInputBox:{
        width: '70%',
    },
    searchInput: {
        paddingLeft: 40,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    studentsListContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    user: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        position: 'relative',
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 20,
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
    },
    selectIndicator: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: colors.dark_blue,
        borderWidth: 1,
        position: 'absolute',
        right: 10,
        bottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: colors.lentils_orange,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButtonText:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,
    },
    notFoundContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 30,
    }

})

export default AddRoom;