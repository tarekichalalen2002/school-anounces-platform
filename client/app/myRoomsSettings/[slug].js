import { View, Text, Animated, TouchableOpacity,ScrollView,TextInput } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../utils/colors";
import { myRooms } from "../../utils/rooms";
import Icon2 from "react-native-vector-icons/Fontisto";

const MyRoomsSettings = () => {
  const { slug } = useLocalSearchParams();
  const room = myRooms.find((room) => room.id === Number(slug));
  return (
    <ScrollView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <Link
        href="/myRooms"
        style={{ position: "absolute", top: 20, left: 30, zIndex: 10 }}
      >
        <Icon name="arrow-left" size={22} color={colors.dark_blue} />
      </Link>
      <View
      style={{
        flex: 1,
        position: "relative",
        marginTop: 70,
        width: "100%",
      }}
      >
        <View style={{
            width: "100%",
            paddingLeft:40,
            paddingHorizontal: 20,
            gap:30
        }}>

{/*____________________________________________________________________________________________________________________________ */}
 
            <View>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: colors.lentils_orange,
                    marginBottom: 10,
                }}>
                    Title:
                </Text>
                <View style={{
                    flexDirection:"row", 
                    width:"100%",
                    justifyContent:"space-between",
                    paddingHorizontal:20
                    }}>
                    <Text
                        style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: colors.dark_blue,
                        marginBottom: 10,
                        width:"90%"
                        }}
                    >
                        {room.title}
                    </Text>
                    <TouchableOpacity>
                        <Icon style={{marginBottom:7}} name="edit" size={16} color={colors.dark_blue} />
                    </TouchableOpacity>
                </View>
            </View>

{/*____________________________________________________________________________________________________________________________ */}

            <View>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: colors.lentils_orange,
                    marginBottom: 10,
                }}>
                    Description:
                </Text>
                <View style={{
                    flexDirection:"row", 
                    width:"100%",
                    justifyContent:"space-between",
                    paddingHorizontal:20
                    }}>
                    <Text
                        style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.dark_blue,
                        marginBottom: 10,
                        width:"50%"
                        }}
                    >
                        {room.description}
                    </Text>
                    <TouchableOpacity>
                        <Icon style={{marginBottom:7}} name="edit" size={16} color={colors.dark_blue} />
                    </TouchableOpacity>
                </View>
            </View>

{/*____________________________________________________________________________________________________________________________ */}

            <View>
                <View style={{
                    width:"100%",
                    alignItems:"center"
                }}
                >
                    <View style={{
                        width:"90%",
                        height:350,
                        borderRadius:5,
                        backgroundColor:colors.light_blue,
                        flexDirection:"column",
                        alignItems:"center",
                        padding:10,
                        elevation:3,
                    }}> 
                        <View style={{
                            width:"80%",
                        }}>
                            <TextInput style={{
                                width:"100%",
                                backgroundColor:"white",
                                borderRadius:50,
                                height:35,
                                elevation:2,
                                paddingHorizontal:20,
                                fontSize:10,
                            }} 
                            placeholder="Search in users ..."
                            />
                            <TouchableOpacity style={{
                                width:40,
                                height:35,
                                backgroundColor:colors.dark_blue,
                                right:0,
                                position:"absolute",
                                borderTopRightRadius:50,
                                borderBottomRightRadius:50,
                                alignItems:"center",
                                justifyContent:"center",
                            }}>
                                <Icon2 name="search" size={16} color="white"/>
                            </TouchableOpacity>
                        </View>                    
                    </View>
                </View>
            </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyRoomsSettings;
