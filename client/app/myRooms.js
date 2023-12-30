import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Header ,Sidebar, DarknessLayer, UsersList, ModifyRequestMenu } from '../components';
import state from '../state';
import { useSnapshot } from 'valtio';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from "react-native-vector-icons/Ionicons"
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons"
import { Link } from 'expo-router';
import { myPendingRooms, myRooms } from '../utils/rooms';

const MyRooms = () => {
  const snap = useSnapshot(state);
  const [isUsersListToggled, setIsUsersListToggled] = useState(false);
  const [usersList, setUsersList] = useState(myRooms[0].users);
  const [roomName, setRoomName] = useState("Gaming");
  const [selectedRequest, setSelectedRequest] = useState(null)

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Header currentTitle="My Rooms" isNotified={true}/>
        </View>
        <ScrollView style={styles.roomsListContainer}>

{/* _______________________________________________ Pending rooms __________________________________________________________________ */}
            
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
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"flex-end", width:"100%"}}>
                        <TouchableOpacity 
                        style={{paddingHorizontal:12, borderRadius:20, paddingVertical:8,flexDirection:"row",gap:10, backgroundColor:colors.lentils_orange, alignItems:"center", marginRight:10, marginBottom:10}}
                        onPress={() => setSelectedRequest(item)}
                        >
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
                        <Link 
                        style={{paddingHorizontal:12, borderRadius:20, paddingVertical:8,flexDirection:"row",gap:10, backgroundColor:colors.lentils_orange, alignItems:"center", marginRight:10, marginBottom:10}}
                        href={`/myRoomsSettings/${item?.id}`}
                        >
                          <Icon2 name='settings-sharp' color="white" size={16}/>
                          <Text style={{color:"white", fontWeight:"700"}}>Advanced settings</Text>
                        </Link>
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
        <ModifyRequestMenu selectedRoom={selectedRequest} close ={() => setSelectedRequest(null)}/>
        {(snap.isSidebarShown || selectedRequest) && <DarknessLayer/>}
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
