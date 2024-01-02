import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Header ,Sidebar, DarknessLayer, UsersList } from '../components';
import state from '../state';
import { useSnapshot } from 'valtio';
import { Sports,Gaming } from "../assets/icons";
import { users } from "../utils/users";
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from "react-native-vector-icons/Ionicons"
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons"

const myPendingRooms = [
    {
      id: 1,
      requestedAt: "2021/08/01",
      title:"Travleing",
      totalInvitations: 42,
      approuvedInvitations: 12,
      icon: () => <Gaming color="white"/>,
      description: "This is room for travelers to talk about traveling and stuff.",
    },
    {
      id:2,
      requestedAt: "2021/08/01",
      title:"Food",
      totalInvitations: 38,
      approuvedInvitations:22,
      icon: () => <Sports color="white"/>,
      description: "This is a food room for food lovers to talk about food and stuff.",
    }
]

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
  const [isUsersListToggled, setIsUsersListToggled] = useState(false);
  const [usersList, setUsersList] = useState(myRooms[0].users);
  const [roomName, setRoomName] = useState("Gaming");
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Header currentTitle="My Rooms" isNotified={true}/>
        </View>
        <ScrollView style={styles.roomsListContainer}>

{/* _______________________________________________ Validated rooms __________________________________________________________________ */}
            
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Pending rooms:</Text>
            </View>

{/* _______________________________________________ Pending rooms __________________________________________________________________ */}
            
            {myPendingRooms.map((item) =>(
                <View style={styles.roomContainer} key={item?.id}>
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
                            <Text style={styles.roomTitle}>{item?.title}</Text>
                        </View>
                        <Text style={styles.creationDate}>Requested in {item?.requestedAt}</Text>
                    </View>

                    {/*------------------------------------------------------------------------------------*/}
                    {/* 
                    {
                      id: 1,
                      requestedAt: "2021/08/01",
                      title:"Travleing",
                      totalInvitations: 42,
                      approuvedInvitations: 12,
                      icon: () => <Gaming color="white"/>,
                      description: "This is room for travelers to talk about traveling and stuff.",
                    },
                    */}
                    
                    <View style={styles.roomContainerBody}>
                        <View style={styles.roomAttribute}>
                            <Text style={styles.roomAttributeTitle}>Description:</Text>
                            <Text style={{...styles.roomAttributeText,flex:1}}>{item?.description}</Text> 
                        </View>
                        <View style={{...styles.roomAttribute,alignItems:"center", marginVertical:10}}>
                          <Text style={styles.roomAttributeTitle}>invitations:</Text>
                          <View style={{position:"relative", width:200, height:10, borderRadius:20, backgroundColor:colors.medium_blue }}>
                            <View style={{position:"absolute", width:(20 / item.totalInvitations)*200, height:10, borderRadius:20, backgroundColor:colors.dark_blue }}/>
                            <View style={{position:"absolute", width:(item.approuvedInvitations / item.totalInvitations)*200, height:10, borderRadius:20, backgroundColor:colors.lentils_orange }}/>
                            <Text style={{position:"absolute", right:0, top:-18, fontWeight:"700", fontSize:10}}>{item.approuvedInvitations} / {item.totalInvitations}</Text>
                            <View style={{position:"absolute", right:-20, top:12}}>
                              {item.approuvedInvitations > 20 ? <Icon name='check' size={16} color={colors.dark_blue} style={{position:"absolute", right:0, top:-18}}/> 
                              : <Icon3 name='clock-outline' size={16} color={colors.dark_blue} style={{position:"absolute", right:0, top:-18}}/>}
                            </View>
                          </View>
                        </View>
                        {/* <View style={{...styles.roomAttribute,alignItems:"center"}}>
                            <Text style={styles.roomAttributeTitle}>Number of users:</Text>
                            <TouchableOpacity onPress={() => {
                              setRoomName(item?.title);
                              setUsersList(item?.users);
                              setIsUsersListToggled(true);
                            }}
                            style={{flexDirection:"row",gap:15,alignItems:"center"}}
                            >
                              <Text style={styles.roomAttributeText}>{item?.users?.length}</Text>
                              <Icon name='users' size={16} color={colors.dark_blue}/>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"flex-end", width:"100%"}}>
                        <TouchableOpacity style={{paddingHorizontal:12, borderRadius:20, paddingVertical:8,flexDirection:"row",gap:10, backgroundColor:colors.lentils_orange, alignItems:"center", marginRight:10, marginBottom:10}}>
                          <Icon name='pen' color="white" size={15}/>
                          <Text style={{color:"white", fontWeight:"700"}}>Modify request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

{/* _______________________________________________ Validated rooms __________________________________________________________________ */}

            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Validated rooms:</Text>
            </View>
{/* _______________________________________________ Validated rooms __________________________________________________________________ */}

              {myRooms.map((item) =>(
                <View style={styles.roomContainer} key={item?.id}>
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
                            <Text style={styles.roomTitle}>{item?.title}</Text>
                        </View>
                        <Text style={styles.creationDate}>Created in {item?.createdAt}</Text>
                    </View>

                    {/* ------------------------------------------------------------------------------------ */}
                    
                    <View style={styles.roomContainerBody}>
                        <View style={styles.roomAttribute}>
                            <Text style={styles.roomAttributeTitle}>Description:</Text>
                            <Text style={{...styles.roomAttributeText,flex:1}}>{item?.description}</Text> 
                        </View>
                        <View style={{...styles.roomAttribute,alignItems:"center"}}>
                            <Text style={styles.roomAttributeTitle}>Number of users:</Text>
                            <TouchableOpacity onPress={() => {
                              setRoomName(item?.title);
                              setUsersList(item?.users);
                              setIsUsersListToggled(true);
                            }}
                            style={{flexDirection:"row",gap:15,alignItems:"center"}}
                            >
                              <Text style={styles.roomAttributeText}>{item?.users?.length}</Text>
                              <Icon name='users' size={16} color={colors.dark_blue}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"flex-end", width:"100%"}}>
                        <TouchableOpacity style={{paddingHorizontal:12, borderRadius:20, paddingVertical:8,flexDirection:"row",gap:10, backgroundColor:colors.lentils_orange, alignItems:"center", marginRight:10, marginBottom:10}}>
                          <Icon2 name='settings-sharp' color="white" size={16}/>
                          <Text style={{color:"white", fontWeight:"700"}}>Advanced settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

        </ScrollView>
        <UsersList 
          isUsersListToggled={isUsersListToggled}
          setIsUsersListToggled={setIsUsersListToggled}
          usersList={usersList}
          roomName={roomName}
        />
        {snap.isSidebarShown && <DarknessLayer/>}
        <Sidebar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    overflow:"scroll",
  },
  headerContainer:{
    height: 75,
  },
  roomsListContainer:{
    padding: 0,
    marginVertical: 30,
    overflow:"scroll",
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
    fontWeight: "400",
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
  },
  listTitleContainer:{
    width:"100%",
    paddingHorizontal:30,
    marginVertical:10
  },
  listTitle: {
    fontWeight:"600", 
    color:colors.lentils_orange, 
    fontSize:18
  }
});

export default MyRooms;
