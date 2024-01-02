import { View, SafeAreaView, Text ,StyleSheet ,FlateList, FlatList, TouchableOpacity, Touchable} from "react-native";
import { Header, DarknessLayer, Sidebar } from "../components";
import { useSnapshot } from "valtio";
import state from "../state";
import React from "react";
import { DMs } from "../utils/DM's";
import { colors } from "../utils/colors";
import  Icon from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";

const MyDMs = () => {
    const snap = useSnapshot(state);
    useEffect(() => {
        
    }, [])
  return (
    <SafeAreaView style={styles.container}>
        <View style={{height:75}}>
            <Header currentTitle="My DM's" isNotified={false} />
        </View>

        <View style={styles.messagesFeedContainer}> 
            <FlatList 
                data={DMs}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 20 }}
                renderItem={({item}) => (
                    <View style={{...styles.messageContainer, backgroundColor: item?.isNew ? colors.light_blue : "white"}}>
                        <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={{fontWeight: "bold", fontSize: 16, color:colors.dark_blue, alignItems:"center"}}>{item.sender}</Text>
                            <Text style={{fontSize:12,fontWeight:"500"}}>{item.time}</Text>
                        </View>
                        <View style={{paddingLeft:"5%"}}>
                            <Text style={{fontSize:16, fontWeight:"600"}}>{item.header}</Text>
                        </View>
                        <View style={{paddingLeft:"5%"}}>
                            <Text style={{fontSize:14, fontWeight:"400"}}>{item.message}</Text>
                        </View>
                        {item?.isInvitation && (
                            <View style={{width:"100%",flexDirection:"row",justifyContent:"flex-end"}}>
                                {!item?.isAccepted ? (
                                    <TouchableOpacity style={{backgroundColor:colors.lentils_orange,margin:10, paddingHorizontal:10, paddingVertical:5, borderRadius:5}}
                                    onPress={() => item.isAccepted = true}
                                    >
                                        <Text style={{color:"white", fontWeight:"bold", fontSize:14}}>Accept</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={{flexDirection:"row",alignItems:"center", gap:10,margin:10, paddingHorizontal:10, paddingVertical:5,}}>
                                        <Text style={{color:colors.dark_blue, fontWeight:"bold", fontSize:14}}>Accepted</Text>
                                        {/* <Icon name="check" size={16} color={colors.dark_blue}/> */}
                                        <Icon name="check" size={16} color={colors.dark_blue}/>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                )}
            />
        </View>

        {snap.isSidebarShown && <DarknessLayer/>}
        <Sidebar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messagesFeedContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 50,
    },
    messageContainer: {
        padding:10,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 1,
        gap:10
    }
})

export default MyDMs;