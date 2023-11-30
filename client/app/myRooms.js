import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Header ,Sidebar, DarknessLayer } from '../components';
import state from '../state';
import { useSnapshot } from 'valtio';
import { Sports,Gaming } from "../assets/icons";
import { users } from "../utils/users";
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';


const myRooms = [
    {
        id: 1,
        title:"Gaming",
        icon: () => <Gaming color="white"/>,
        description: "This is a gaming room for gamers to talk about games and stuff.",
        users: [
            users[0],
            users[1],
            users[5],
            users[6],
            users[7],
            users[8],
            users[9],
        ],
        createdAt: "2021/08/01",
    },
    {
        id:2,
        title:"Sports",
        icon: () => <Sports color="white"/>,
        description: "This is a sports room for sports fans to talk about sports and stuff.",
        users: [
            users[0],
            users[1],
            users[5],
            users[6],
            users[7],
            users[8],
            users[9],
        ],
        createdAt: "2021/08/01",
    },
]

const MyRooms = () => {
    const snap = useSnapshot(state);
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Header currentTitle="My Rooms" isNotified={true}/>
        </View>
        <View style={styles.roomsListContainer}>
            <FlatList 
            contentContainerStyle={{ paddingBottom: 100 }}
            data={myRooms}
            renderItem={({item}) => (
                <View style={styles.roomContainer}>
                    <View style={styles.roomHeaderContainer}>
                        <View style={{
                            flexDirection:"row",
                            alignItems:"center",
                            gap:10,
                        }}>
                            <View style={{
                            width:45,
                            height:45,
                            borderRadius:50,
                            backgroundColor:colors.dark_blue,
                            flexDirection:"row",
                            justifyContent:"center",
                            alignItems:"center",
                            }}>
                                <item.icon />
                            </View>
                            <Text style={styles.roomTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.creationDate}>Created in {item.createdAt}</Text>
                    </View>

                    {/* --------------------------------------------------------------------- */}
                    
                    <View style={styles.roomContainerBody}>
                        <View style={styles.roomAttribute}>
                            <Text style={styles.roomAttributeTitle}>Description:</Text>
                            <Text style={{...styles.roomAttributeText,flex:1}}>{item.description}</Text> 
                        </View>
                        <View style={{...styles.roomAttribute,alignItems:"center"}}>
                            <Text style={styles.roomAttributeTitle}>Number of users:</Text>
                            <Text style={styles.roomAttributeText}>{item.users.length}</Text>
                            <Icon name='users' size={16}/>
                        </View>
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.id}

            />
        </View>
        {snap.isSidebarShown && <DarknessLayer/>}
        <Sidebar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  headerContainer:{
    height: 75,
  },
  roomsListContainer:{
    padding: 0,
    marginVertical: 30,
  },
  roomContainer: {
    marginVertical:10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: colors.light_blue,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
    gap: 15,
  },
  roomHeaderContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",

  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark_blue,
  },
  creationDate: {
    fontSize: 12,
    color: colors.dark_blue,
    fontWeight: "500",
  },
  roomContainerBody:{
    padding: 10,
    flexDirection:"column",
    gap: 14,
  },
  roomAttribute:{
    flexDirection:"row",
    gap: 10,
    width: "100%",
  },
  roomAttributeTitle:{
    fontSize: 14,
    color: colors.dark_blue,
    fontWeight: "bold",
  },
  roomAttributeText:{
    fontWeight: "500",
    flexWrap: "wrap",
  }
});

export default MyRooms;
